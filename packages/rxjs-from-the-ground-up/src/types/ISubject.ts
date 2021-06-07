import { Subscriber } from "./subscriber";
import { Subscription } from "./subscription";

export interface ISubject {
  next: (val: any) => void;
  complete: () => void;
  error: (err: Error) => void;
  subscribe: (subscriber: Subscriber) => Subscription;
}
