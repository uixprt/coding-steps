import { Subscription } from "./subscription";

export interface Observable {
  subscribe: (
    next: (val) => void,
    error: (err: Error) => void,
    complete: () => void
  ) => Subscription;
}
