import { toRna } from "./rna-transcription";

describe("Transcription", () => {
  test.skip("empty rna sequence", () => {
    expect(toRna("")).toEqual("");
  });

  test.skip("transcribes cytosine to guanine", () => {
    expect(toRna("C")).toEqual("G");
  });

  test.skip("transcribes guanine to cytosine", () => {
    expect(toRna("G")).toEqual("C");
  });

  test.skip("transcribes thymine to adenine", () => {
    expect(toRna("T")).toEqual("A");
  });

  test.skip("transcribes adenine to uracil", () => {
    expect(toRna("A")).toEqual("U");
  });

  test.skip("transcribes all dna nucleotides to their rna complements", () => {
    expect(toRna("ACGTGGTCTTAA")).toEqual("UGCACCAGAAUU");
  });
});
