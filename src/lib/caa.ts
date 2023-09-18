import { EventEmitter } from 'events';

export enum ELocatorType {
    RSSI = 0,
    AOA = 1
}
export interface ILocator {
    mac: string;
    type: ELocatorType;
    mapId: string;
    zoneId: string;
    dimensionMode: number;
    x: number;
    y: number;
    z: number;
    elevation: number;
    azimuth: number;
    rotation: number;
}
export interface IAddr {
    ip: string;
    port: number;
    netmask: string;
    broadcast_ip: string;
    broadcast_port: number;
}
export interface IBeacon {
    mac: string;
    x: number;
    y: number;
    z: number;
    rssi: number;
    battery: number;
    frequency: number;
    channel: number;
    method: number;
    powerType: number;
    powerValue: number;
    recv: number;
    sos: number;
    mapId: string;
    zoneId: string;
    lastLocatorMac: string;
    nearestLocatorMac: string;
    calculatedAt: number;
    updatedAt: number;
    gSensors: number[];
    userdata: Buffer;
}
export interface IHeartbeat {
    mac: string;
    ip: string;
    port: number;
    updatedAt: number;
}
export interface ICAA {
    version(): string;
    caacInit(): void;
    caacManiInit(): void;
    caacMani6xInit(): void;
    caacAddPkt(buffer: Buffer): void;
    caacSetSignalFilterParams(signal_filter_mode: number): void;
    caalInit(): void;
    caalSetGlobalBeaconHeight(beaconHeight: number): void;
    caalSetSmoothLevel(smoothLevel: number): void;
    caalSetSyncInterval(syncInterval: number): void;
    caalAddLocator(locator: ILocator): void;
    caalAddZone(id: string, mapId: string, points: number[][]): void;
    caalSetGsensorParams(gsensor_mode: number, gsensor_change_ratio: number, gsensor_switch_time_move2static: number, gsensor_switch_time_static2move: number): void;
    caalSetJumpParams(jump_mode: number, jump_distance: number): void;
    caalSetSmoothParams(smooth_mode: number): void;
    caalSetMapSwitchParams(map_switch_mode: number): void;
    setEventEmitter(ee: EventEmitter): void;
    initWorkers(numberOfWorkers: number, addrs: IAddr[], heartbeat: {
        interval: number;
        lifetime: number;
    }): void;
    sendUdp(ipv4: string, port: number, data: Buffer): void;
    enableMobileGsensors(enabled: boolean): void;
    enableBeaconsCounter(enabled: boolean): void;
    enableLocatorsCounter(enabled: boolean): void;
    enableHeartbeatBroadcast(enabled: boolean): void;
    getBeacons(): IBeacon[];
    getBeaconsBuffer(min_timestamp: number): Buffer;
    setBeaconLifetime(ts: number): void;
}
type IMessageEvents = {
    debug: (msg: string) => void;
    error: (errCode: number, errMsg: string) => void;
    counter: (buffer: Buffer) => void;
    'beacons-counter': (buffer: Buffer) => void;
    'locators-counter': (buffer: Buffer) => void;
    'beacon-response': (mac: string, buffer: Buffer) => void;
    heartbeat: (buffer: Buffer) => void;
    udp: (ip: string, port: number, data: Buffer) => void;
};
type EventMap = {
    [key: string]: (...args: any[]) => void;
};
interface TypedEventEmitter<Events extends EventMap> {
    addListener<E extends keyof Events>(event: E, listener: Events[E]): this;
    on<E extends keyof Events>(event: E, listener: Events[E]): this;
    once<E extends keyof Events>(event: E, listener: Events[E]): this;
    prependListener<E extends keyof Events>(event: E, listener: Events[E]): this;
    prependOnceListener<E extends keyof Events>(event: E, listener: Events[E]): this;
    off<E extends keyof Events>(event: E, listener: Events[E]): this;
    removeAllListeners<E extends keyof Events>(event?: E): this;
    removeListener<E extends keyof Events>(event: E, listener: Events[E]): this;
    emit<E extends keyof Events>(event: E, ...args: Parameters<Events[E]>): boolean;
    eventNames(): (keyof Events | string | symbol)[];
    rawListeners<E extends keyof Events>(event: E): Events[E][];
    listeners<E extends keyof Events>(event: E): Events[E][];
    listenerCount<E extends keyof Events>(event: E): number;
    getMaxListeners(): number;
    setMaxListeners(maxListeners: number): this;
}
export type IEventEmitter = TypedEventEmitter<IMessageEvents>;
