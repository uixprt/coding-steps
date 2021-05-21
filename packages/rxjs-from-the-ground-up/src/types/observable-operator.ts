import { Observable } from "./observable";

export type ObservableOperatorOp<T> = (source$: Observable<T>) => Observable<T>;
