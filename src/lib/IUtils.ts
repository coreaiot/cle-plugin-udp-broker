import * as colors from 'colors/safe';
import * as glob from 'glob';
import * as json5 from 'json5/dist/index';
import { Context } from 'koa';
import * as moment from 'moment';
import { nanoid } from 'nanoid';
import { Socket } from 'net';
import * as rxjs from 'rxjs';
import * as rxjsOperators from 'rxjs/operators';
import { ICAA, IEventEmitter } from './caa';
import Router = require('koa-router');
import { IProjectEnv } from './IProjectEnv';
import { IProjectLocator } from './IProjectLocator';
import { IBeaconResult } from './IBeacons';
import { IGateways, IGatewaysIndexedByAddr, IGatewaysIndexedByMac } from './IGateways';
import { IUdp } from './IUdp';

interface IModules {
  colors: typeof colors;
  glob: typeof glob;
  json5: typeof json5;
  moment: typeof moment;
  nanoid: typeof nanoid;
  rxjs: typeof rxjs;
  rxjsOperators: typeof rxjsOperators;
};

export interface IUtils<
  Plugin,
  Config extends {
    fields: ReadonlyArray<any>;
  },
> {
  modules: IModules;
  http: {
    isAuthenticated: (ctx: Context, next: any) => Promise<void>;
    apis: ((router: Router) => void)[];
  };
  udp: IUdp;
  cpk: any;
  encryptData(buf: Buffer): Promise<Buffer>;
  decryptData(buf: Buffer): Promise<Buffer>;
  loadConfig(plugin: Plugin): Promise<{
    [k in Config['fields'][number]['name']]: ValueType<Extract<Config['fields'][number], { name: k }>['value']>;
  }>;
  saveConfig(plugin: Plugin, config: Object): Promise<void>;
  updateStatus(plugin: Plugin): Promise<void>;
  dashboardSocket: Socket;
  projectEnv: IProjectEnv;
  projectChannels: number[];
  activeLocators: IProjectLocator[];
  ca: ICAA,
  ee: IEventEmitter,
  parseBeaconResult(channels: number[], buf: Buffer, offset: number): IBeaconResult,
  packGatewaysByAddr(activeLocators: IProjectLocator[], min_timestamp: number, filter_by_macs?: string[]): IGatewaysIndexedByAddr,
  packGatewaysByMac(activeLocators: IProjectLocator[], min_timestamp: number, filter_by_macs?: string[]): IGatewaysIndexedByMac,
  packGatewaysToBuffer(activeLocators: IProjectLocator[], min_timestamp: number, filter_by_macs?: string[]): Buffer,
}

type ValueType<T> =
  T extends number ? number :
  T extends string ? string :
  T extends boolean ? boolean :
  T extends readonly number[] ? number[] :
  T extends readonly string[] ? string[] :
  unknown;
