import { UnaryFunction } from "./unary-function";
import { Observable } from "./observable";

export interface OperatorFunction<T, R>
  extends UnaryFunction<T, R>,
    Observable {
  (source: T): R;
}
