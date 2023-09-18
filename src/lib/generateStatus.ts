export function generateStatus<const Fields extends ReadonlyArray<{
  name: string;
  description: string;
  value: any;
}>>(opt: {
  fields: Fields,
  getResult(
    obj: {
      [k in Fields[number]['name'] | 'result']:
      Extract<Fields[number], { name: k }>['value'] extends never ?
      string : Extract<Fields[number], { name: k }>['value'];
    },
  ): string;
  getStyle(
    obj: {
      [k in Fields[number]['name'] | 'result']:
      Extract<Fields[number], { name: k }>['value'] extends never ?
      string : Extract<Fields[number], { name: k }>['value'];
    },
    key: Fields[number]['name'] | 'result',
  ): string;
}) {
  return opt;
}
