import { Signal, signalsText } from "../signal";

export function secretHandshake(signalsNumber: number) {
  let binaryArray = [];
  let tempNum = signalsNumber;

  while (tempNum > 0) {
    const remainder = tempNum % 2;
    binaryArray.push(remainder);

    tempNum = Math.floor(tempNum / 2);
  }

  return binaryArray.reduce((acc, binaryDigit, index) => {
    if (binaryDigit === 0) {
      return acc;
    }

    const signal = binaryDigit * Math.pow(10, index);

    if (signal === Signal.Reverse) {
      acc.reverse();
      return acc;
    }

    acc.push(signalsText[signal]);
    return acc;
  }, []);
}
