import { isPangram } from "./pangram";

describe("Pangram()", () => {
  test.skip("empty sentence", () => {
    expect(isPangram("")).toBe(false);
  });

  test.skip("perfect lower case", () => {
    expect(isPangram("abcdefghijklmnopqrstuvwxyz")).toBe(true);
  });

  test.skip("only lower case", () => {
    expect(isPangram("the quick brown fox jumps over the lazy dog")).toBe(true);
  });

  test.skip("missing the letter 'x'", () => {
    expect(
      isPangram("a quick movement of the enemy will jeopardize five gunboats")
    ).toBe(false);
  });

  test.skip("missing the letter 'h'", () => {
    expect(isPangram("five boxing wizards jump quickly at it")).toBe(false);
  });

  test.skip("with underscores", () => {
    expect(isPangram("the_quick_brown_fox_jumps_over_the_lazy_dog")).toBe(true);
  });

  test.skip("with numbers", () => {
    expect(isPangram("the 1 quick brown fox jumps over the 2 lazy dogs")).toBe(
      true
    );
  });

  test.skip("missing letters replaced by numbers", () => {
    expect(isPangram("7h3 qu1ck brown fox jumps ov3r 7h3 lazy dog")).toBe(
      false
    );
  });

  test.skip("mixed case and punctuation", () => {
    expect(isPangram('"Five quacking Zephyrs jolt my wax bed."')).toBe(true);
  });

  test.skip("case insensitive", () => {
    expect(isPangram("the quick brown fox jumps over with lazy FX")).toBe(
      false
    );
  });
});
