export function flattenDeep<T>(collection: any[]): T[] {
  if (!collection.length) {
    return [];
  }
  let counter = 1;
  return collection.reduce((acc, item) => {
    acc = Array.isArray(item) ? [...acc, ...flattenDeep(item)] : [...acc, item];
    return acc;
  }, []);
}
