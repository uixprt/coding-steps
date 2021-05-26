export function drop(array: [], amountToDrop: number, dir = "left") {
  if (!amountToDrop && amountToDrop !== 0) {
    if (dir === "right") {
      return array.slice(0, -1);
    }
    return array.slice(1);
  }

  if (array.length < amountToDrop) {
    return [];
  }

  if (amountToDrop === 0) return array;

  return dir === "right"
    ? array.slice(0, -amountToDrop)
    : array.slice(amountToDrop);
}
