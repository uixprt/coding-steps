// import {chunk} from './chunk.solution-example';
import { chunk } from "./chunk";

xdescribe("chunk", () => {
  test("split even array correctly to groups of 2", () => {
    expect(chunk(["a", "b", "c", "d"], 2)).toEqual([
      ["a", "b"],
      ["c", "d"],
    ]);
  });

  test("split rest on odd array correctly to groups of 3", () => {
    expect(chunk(["a", "b", "c", "d"], 3)).toEqual([["a", "b", "c"], ["d"]]);
  });
});
