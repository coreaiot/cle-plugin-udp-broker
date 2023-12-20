interface ILocatorsResult {
  type: 'locators';
  data: {
    [IpAddressV4: string]: ILocator;
  };
}