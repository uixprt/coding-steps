import { ObservableOperatorOp } from "../types/observable-operator";

export function filter<T>(
  checkFn: (value: T) => boolean
): ObservableOperatorOp<T> {}
