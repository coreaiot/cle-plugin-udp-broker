interface ILocatorsResult {
  type: 'locators';
  data: {
    [mac: string]: ILocator;
  };
  timestamp: number;
}