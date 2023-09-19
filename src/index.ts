export * from './config';
export * from './status';
export * from './i18n';

import { Plugin, Utils } from './lib';
import { createSocket } from 'dgram';
import { deflate, gzip } from 'zlib';
import { join } from 'path';
import { readFile, writeFile } from 'fs/promises';

function deflateStr(str: string) {
  return new Promise<Buffer>((r, rr) => {
    deflate(Buffer.from(str), (err, out) => {
      if (err) return rr(err);
      return r(out);
    });
  });
}

function gzipStr(str: string) {
  return new Promise<Buffer>((r, rr) => {
    gzip(Buffer.from(str), (err, out) => {
      if (err) return rr(err);
      return r(out);
    });
  });
}

async function loadSubscribers(path: string) {
  try {
    const c = await readFile(path);
    return JSON.parse(c.toString());
  } catch (e) {
    return [];
  }
}

async function saveSubscribers(path: string, data) {
  try {
    await writeFile(path, JSON.stringify(data, null, 2));
  } catch { }
}

export async function init(self: Plugin, utils: Utils) {
  const config = await utils.loadConfig(self);

  if (utils.dashboardSocket) {
    utils.dashboardSocket.write(JSON.stringify({
      topic: 'extra-tables',
      data: [
        {
          id: self.name,
          type: 'udp',
          port: config.bindPort,
        },
      ],
    }));
  }
  const path = join(process.env.CLE_DATA, self.name + '.json');
  self.status.subscribers = await loadSubscribers(path);

  setInterval(() => {
    utils.updateStatus(self);
  }, 1000);

  if (config.subscriberLifetime > 0) {
    const ms = config.subscriberLifetime * 1000;
    const now = new Date().getTime();
    self.status.subscribers = self.status.subscribers.filter(s =>
      s.ts + ms > now
    );

    setInterval(() => {
      const now = new Date().getTime();
      self.status.subscribers = self.status.subscribers.filter(s =>
        s.ts + ms > now
      );
    }, 1000);
  }

  function saveStatus() {
    for (const s of self.status.subscribers) {
      s.value = s.ip + ':' + s.port + (s.compress ? ` (${s.compress})` : '');
    }
    saveSubscribers(path, self.status.subscribers);
  }

  const udpApi = createSocket('udp4');
  udpApi.bind(config.bindPort, config.bindIp);
  self.logger.info(`UDP broker bond at ${config.bindIp}:${config.bindPort}`);
  udpApi.on('message', async (msg, rinfo) => {
    self.logger.debug(msg, rinfo);
    const x = { msg, rinfo };
    try {
      const msg = x.msg.toString();
      const args = msg.split(':');

      if (args[0] === 'subscribe') {
        const id = args[2] || `${x.rinfo.address}:${x.rinfo.port}`;
        let ex = self.status.subscribers.find(
          s => s.id === id
        );
        if (!ex) {
          ex = {
            id,
            ip: x.rinfo.address,
            port: x.rinfo.port,
            compress: args[1],
            ts: new Date().getTime(),
          };
          self.status.subscribers.push(ex);
          if (config.maxNumberOfSubscribers > 0)
            while (self.status.subscribers.length > config.maxNumberOfSubscribers)
              self.status.subscribers.shift();
        } else {
          ex.compress = args[1];
          ex.ip = x.rinfo.address;
          ex.port = x.rinfo.port;
          ex.ts = new Date().getTime();
        }
        saveStatus();
        utils.updateStatus(self);
        return;
      }

      if (msg === 'unsubscribe') {
        const id = args[2] || `${x.rinfo.address}:${x.rinfo.port}`;
        let exi = self.status.subscribers.findIndex(
          s => s.id === id
        );
        if (~exi) {
          self.status.subscribers.splice(exi, 1);
          saveStatus();
          utils.updateStatus(self);
        }
        return;
      }
    } catch (e) {
      self.logger.error(e);
      return;
    }
  });

  const intervalfn = async (type, dataFn) => {
    if (!self.status.subscribers.length) return;
    const data = dataFn();
    const keys = Object.keys(data);
    if (keys.length) {
      const json = JSON.stringify({
        type,
        data,
      });

      const raws = self.status.subscribers.filter(x => !x.compress || x.compress === 'raw');
      const deflates = self.status.subscribers.filter(x => x.compress === 'zlib' || x.compress === 'deflate');
      const gzips = self.status.subscribers.filter(x => x.compress === 'gzip');

      if (raws.length) {
        if (json.length > 65535) {
          const len = Math.floor(keys.length / Math.ceil(json.length / 40000));
          let i = 0;
          while (i < keys.length) {
            const ks = keys.slice(i, i + len);
            const dt = {};
            for (const k of ks)
              dt[k] = data[k];
            const json = JSON.stringify({
              type,
              data: dt,
            });
            for (const s of raws) {
              udpApi.send(json, s.port, s.ip);
              await new Promise(r => setTimeout(r, 5));
            }
            i += len;
          }
        } else {
          for (const s of raws) {
            udpApi.send(json, s.port, s.ip);
          }
        }
      }

      if (deflates.length || gzips.length) {
        const fn = async (compress) => {
          const buf = await compress(json);
          if (buf.length > 65535) {
            let size = buf.length;
            let dv = 1;
            let len;
            let firstBuffer;
            while (size > 40000) {
              dv *= 2;
              len = Math.ceil(keys.length / dv);
              const ks = keys.slice(0, len);
              const dt = {};
              for (const k of ks)
                dt[k] = data[k];
              const json = JSON.stringify({
                type,
                data: dt,
              });
              firstBuffer = await compress(json);
              size = firstBuffer.length;
            }
            for (const s of deflates) {
              udpApi.send(firstBuffer, s.port, s.ip);
            }
            let i = len;
            while (i < keys.length) {
              const ks = keys.slice(i, i + len);
              const dt = {};
              for (const k of ks)
                dt[k] = data[k];
              const json = JSON.stringify({
                type,
                data: dt,
              });
              const buffer = await compress(json);
              for (const s of deflates) {
                await new Promise(r => setTimeout(r, 3));
                udpApi.send(buffer, s.port, s.ip);
              }
              i += len;
            }
          } else {
            for (const s of deflates) {
              udpApi.send(buf, s.port, s.ip);
            }
          }
        }
        if (deflates.length) {
          fn(deflateStr);
        }
        if (gzips.length) {
          fn(gzipStr);
        }
      }
    }
  };

  setInterval(() => intervalfn('sensors', () => {
    const now = new Date().getTime();
    const ts = config.postOutdatedTags ? now - utils.projectEnv.beaconLifeTime : now - utils.projectEnv.beaconAuditTime;
    const buf = utils.ca.getBeaconsBuffer(ts);

    const data = {};
    if (buf.length > 5) {
      const bsize = buf.readUint16LE(3);
      const n = (buf.length - 5) / bsize;
      for (let i = 0; i < n; ++i) {
        const b = utils.parseBeaconResult(utils.projectChannels, buf, i * bsize + 5);
        data[b.mac] = b;
        delete b.mac;
      }
    }
    return data;
  }), utils.projectEnv.beaconAuditTime);

  setInterval(() => intervalfn('locators', () => {
    const now = new Date().getTime();
    const ts = now - utils.projectEnv.locatorLifeTime;
    const data = utils.packGatewaysByAddr(utils.activeLocators, ts);
    return data;
  }), utils.projectEnv.locatorAuditTime);

  return true;
}

export async function test(self: Plugin, utils: Utils) {
  self.logger.info('Test', self.name);
  self.logger.info('Loading Config ..');
  const config = await utils.loadConfig(self);
  console.log(config);
  self.logger.info('Test OK.');
}
