export function flatten<T>(collection: any[]): T[] {
  if (!collection.length) {
    return [];
  }
  return collection.reduce((acc, item) => {
    if (item?.length > 0) {
      acc = [...acc, ...item];
    } else {
      acc = [...acc, item];
    }
    return acc;
  }, []);
}
