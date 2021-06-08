import { OperatorFunction } from "./operator-function";

export interface MonoTypeOperatorFunction<T> extends OperatorFunction<T, T> {
  (source: T): T;
}
