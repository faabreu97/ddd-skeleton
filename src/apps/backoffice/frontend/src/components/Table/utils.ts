export function getValue<T extends object>(object: T, key: string): unknown {
  const splitedKey = key.split('.');
  if (splitedKey.length === 1) {
    return object[splitedKey[0] as keyof T];
  } else {
    return getValue(object[splitedKey[0] as keyof T] as object, splitedKey[1]);
  }
}

export const rowsPerPageOptions = [5, 20, 50];

export function checkNestedKeys<T extends object>(
  item: T,
  searchValue: string
): boolean {
  const keys = Object.keys(item) as (keyof T)[];
  return keys.some(key => {
    if (typeof item[key] === 'object' && !!item[key]) {
      return checkNestedKeys(item[key] as object, searchValue);
    }
    if (
      typeof item[key] === 'string' &&
      (item[key] as string).toLowerCase().includes(searchValue.toLowerCase())
    ) {
      return true;
    }
    if (typeof item[key] === 'number' && item[key] === parseInt(searchValue)) {
      return true;
    }
    return false;
  });
}
