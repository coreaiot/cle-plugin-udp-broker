const { createSocket } = require('dgram');
const { unzip } = require('zlib');

const client = createSocket('udp4');

const heartbeat = () =>
  client.send('subscribe:zlib', 55555, '192.168.123.186');
heartbeat();
setInterval(heartbeat, 30000);

client.on('message', msg => {
  try {
    unzip(msg, (err, buffer) => {
      if (err) return;
      const json = buffer.toString();
      console.log(json);
    });
  } catch (e) {
    console.error(e);
  }
});
