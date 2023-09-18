export interface IProjectLocator {
  address: string;
  active: boolean;
  type: string;
  modelName: string;
  mac: string;
  macWithoutColon: string;
  name: string;
  x: number;
  y: number;
  z: number;
  azimuth: number;
  elevation: number;
  rotation: number;
  errorDegree: number;
  mapId: string;
  zoneId: string;
  updatedAt: number;
  wireless?: {
    status: string;
    type: string;
    rssiLevel: number;
    channel: number;
    ssid?: string;
  };
  LAN?: {
    ip: string;
    mode: string;
    subnetMask: string;
    defaultGateway: string;
  };
  version?: string;
  realModelName?: string;
  channels?: {
    value: number;
    whitening: boolean;
  }[];
}
