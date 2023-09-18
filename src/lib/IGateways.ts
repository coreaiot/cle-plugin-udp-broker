export interface IGatewaysIndexedByAddr {
  [addr: string]: IGatewayResultIndexedByAddr;
}

export type IGateways = IGatewaysIndexedByAddr;

export interface IGatewaysIndexedByMac {
  [mac: string]: IGatewayResultIndexedByMac;
}

export interface IGatewayResultCommon {
  angles: number[];
  updatedAt: number;
  info?: {
    version?: string;
    name: string;
    type: string;
    mapId: string;
    zoneId: string;
    channels: Array<{
      value: number;
      whitening: boolean;
    }>;
    elevation: number;
    azimuth: number;
    rotation: number;
    errorDegree: number;
    x: number;
    y: number;
    z: number;
    modelName: string;
    realModelName?: string;

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
  };
  online: boolean;
}

export interface IGatewayResultIndexedByAddr extends IGatewayResultCommon {
  mac: string;
}

export interface IGatewayResultIndexedByMac extends IGatewayResultCommon {
  ip: string;
}
