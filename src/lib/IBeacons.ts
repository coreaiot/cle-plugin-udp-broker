export interface IBeacons {
  [mac: string]: IBeaconResult;
}

export interface IBeaconResult {
  mac: string;
  x: number;
  y: number;
  z: number;
  rssi: number;
  mapId: string;
  zoneId: string;
  // zoneName: string;
  updatedAt: number;
  calculatedAt: number;
  // pushedAt: number;
  userData: any;
  userDataTs: { [k: number]: number };
  lastGateway: string;
  nearestGateway: string;
  // gps: {
  //   lat: number;
  //   lon: number;
  // };
}
