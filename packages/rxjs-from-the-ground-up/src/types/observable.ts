import { Subscription } from "./subscription";

export interface Observable<T> {
  subscribe: (
    next: (val: T) => void,
    error: (err: Error) => void,
    complete: () => void
  ) => Subscription;
}
