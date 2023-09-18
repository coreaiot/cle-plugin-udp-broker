interface IPluginI18n {
  [lang: string]: {
    [word: string]: string;
  };
  'en-US'?: {
    [word: string]: string;
  };
  'zh-CN'?: {
    [word: string]: string;
  };
}

export function generateI18n(opt: IPluginI18n) {
  return opt;
}