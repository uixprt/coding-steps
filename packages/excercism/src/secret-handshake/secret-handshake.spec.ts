import { solutions } from "./solutions";

function runSpec(name: string, secretHandshake: Function) {
  describe(`secret handshake - ${name}`, () => {
    test("should return correct regular signals for 1", () => {
      expect(secretHandshake(1)).toEqual(["wink"]);
    });

    test("should return correct regular signals for 2", () => {
      expect(secretHandshake(2)).toEqual(["double blink"]);
    });

    test("should return correct regular signals for 3", () => {
      expect(secretHandshake(3)).toEqual(["wink", "double blink"]);
    });

    test("should return correct regular signals for 4", () => {
      expect(secretHandshake(4)).toEqual(["close your eyes"]);
    });

    test("should return correct regular signals for 5", () => {
      expect(secretHandshake(5)).toEqual(["wink", "close your eyes"]);
    });

    test("should return correct regular signals for 8", () => {
      expect(secretHandshake(8)).toEqual(["jump"]);
    });

    test("should reverse signals when reverse is recived", () => {
      expect(secretHandshake(19)).toEqual(["double blink", "wink"]);
    });

    test("should emit not signals when 0 is received", () => {
      expect(secretHandshake(0)).toEqual([]);
    });
  });
}

Object.entries(solutions).forEach(([name, solution]) =>
  runSpec(name, solution)
);
