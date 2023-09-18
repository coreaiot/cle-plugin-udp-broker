interface IPluginConfigFieldCommon {
  name: string;
  description: string;
}

interface IPluginConfigFieldText extends IPluginConfigFieldCommon {
  type: 'text' | 'textarea';
  placeholder: string;
  value: string;
}

interface IPluginConfigFieldNumber extends IPluginConfigFieldCommon {
  type: 'number';
  placeholder: string;
  value: number;
}

interface IPluginConfigFieldPassword extends IPluginConfigFieldCommon {
  type: 'password';
  value: string;
}

interface IPluginConfigFieldSwitch extends IPluginConfigFieldCommon {
  type: 'switch';
  value: boolean;
}

interface IPluginConfigFieldDropdown<T> extends IPluginConfigFieldCommon {
  type: 'dropdown';
  items: ReadonlyArray<{
    label: string;
    value: T;
  }>;
  value: T;
}

interface IPluginConfigFieldCheckbox<T> extends IPluginConfigFieldCommon {
  type: 'checkbox';
  items: ReadonlyArray<{
    label: string;
    value: T;
  }>;
  value: ReadonlyArray<T>;
}

interface IPluginConfigFieldKeymaps extends IPluginConfigFieldCommon {
  type: 'keymaps';
  value: any;
}

type PluginConfigField =
  IPluginConfigFieldText |
  IPluginConfigFieldNumber |
  IPluginConfigFieldPassword |
  IPluginConfigFieldSwitch |
  IPluginConfigFieldDropdown<string> |
  IPluginConfigFieldDropdown<number> |
  IPluginConfigFieldCheckbox<string> |
  IPluginConfigFieldCheckbox<number> |
  IPluginConfigFieldKeymaps;

export function generateConfig<const Fields extends readonly PluginConfigField[]>(opt: {
  description: string;
  fields: Fields;
}) {
  return opt;
}
