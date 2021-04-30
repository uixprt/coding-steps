import { colorCode, COLORS } from "./resistor-color";

describe("ResistorColor", () => {
  describe("Color codes", () => {
    test.skip("Black", () => {
      expect(colorCode("black")).toEqual(0);
    });

    test.skip("White", () => {
      expect(colorCode("white")).toEqual(9);
    });

    test.skip("Orange", () => {
      expect(colorCode("orange")).toEqual(3);
    });
  });

  test.skip("Colors", () => {
    expect(COLORS).toEqual([
      "black",
      "brown",
      "red",
      "orange",
      "yellow",
      "green",
      "blue",
      "violet",
      "grey",
      "white"
    ]);
  });
});
