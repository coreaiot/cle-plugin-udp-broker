interface IBeaconsResult {
  type: 'sensors';
  data: {
    [IpAddressV4: string]: IBeacon;
  };
  timestamp: number;
}