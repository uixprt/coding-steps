import { Subscription } from "./subscription";
import { Subscriber } from "./subscriber";

export interface Observable {
  subscribe: (subscriber: Subscriber) => Subscription;
}
