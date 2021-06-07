export enum Signal {
  Wink = 1,
  DoubleBlick = 10,
  CloseYourEyes = 100,
  Jump = 1000,
  Reverse = 10000,
}

export const signalsText = {
  [Signal.Wink]: "wink",
  [Signal.DoubleBlick]: "double blink",
  [Signal.CloseYourEyes]: "close your eyes",
  [Signal.Jump]: "jump",
};
