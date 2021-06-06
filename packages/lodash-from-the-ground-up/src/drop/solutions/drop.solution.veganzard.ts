export function drop(array: [], amountToDrop: number, isRight = false) {
  if (!amountToDrop && amountToDrop !== 0) {
    if (isRight) {
      return array.slice(0, -1);
    }
    return array.slice(1);
  }

  if (array.length < amountToDrop) {
    return [];
  }

  if (amountToDrop === 0) return array;

  return isRight ? array.slice(0, -amountToDrop) : array.slice(amountToDrop);
}
