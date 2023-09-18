export interface IProjectEnv {
  heartbeatInterval: number;
  beaconAuditTime: number;
  beaconLifeTime: number;
  locatorAuditTime: number;
  locatorLifeTime: number;
  beaconUserdataMaxCachedTs: number;
  oldMqttUsed: boolean;
  oldSocketIOUsed: boolean;
}
