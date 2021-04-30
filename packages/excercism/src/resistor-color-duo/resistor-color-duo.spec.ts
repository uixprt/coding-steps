import { decodedValue } from "./resistor-color-duo";

describe("Resistor Colors", () => {
  test.skip("Brown and black", () => {
    expect(decodedValue(["brown", "black"])).toEqual(10);
  });

  test.skip("Blue and grey", () => {
    expect(decodedValue(["blue", "grey"])).toEqual(68);
  });

  test.skip("Yellow and violet", () => {
    expect(decodedValue(["yellow", "violet"])).toEqual(47);
  });

  test.skip("Orange and orange", () => {
    expect(decodedValue(["orange", "orange"])).toEqual(33);
  });

  test.skip("Ignore additional colors", () => {
    expect(decodedValue(["green", "brown", "orange"])).toEqual(51);
  });
});
