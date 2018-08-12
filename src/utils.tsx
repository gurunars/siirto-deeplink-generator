export const merge = (...sources: Object[]): Object =>
  Object.assign({}, ...sources);

export const hashCode = (str: string): number => {
  let hash = 0;
  if (str.length === 0) { return hash; }
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    /* tslint:disable:no-bitwise */
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash;
};

const pad = (num: number) => num < 10 ? "0" + num : num;

export const toString = (date?: Date | null) => {
  //  console.log(date);
  return date == null ? null :
    pad(date.getUTCFullYear()) + "-" +
    pad(date.getUTCMonth() + 1) + "-" +
    pad(date.getUTCDate());
};