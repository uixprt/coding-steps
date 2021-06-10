function objPropTransformerFactory(key: string | Function) {
  if (typeof key === "function") {
    return (item) => key(item);
  }

  return (item) => item[key];
}

export function groupBy<T>(
  collection: any[],
  transformer: string | Function
): Record<string, T[]> {
  const _getGroupKey = objPropTransformerFactory(transformer);

  return collection.reduce((acc, item) => {
    const _groupKey = _getGroupKey(item);

    (acc[_groupKey] || (acc[_groupKey] = [])).push(item);

    return acc;
  }, {});
}
