interface IBeaconsResult {
  type: 'sensors';
  data: {
    [beaconMac: string]: IBeacon;
  };
}