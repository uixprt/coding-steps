import { Subscriber } from "../types/Subscriber";
import { TeardownLogic } from "../types/teardown-logic";
import { Observable } from "../types/observable";

export function createObservable(
  onSubscribe: (subscriber: Subscriber) => TeardownLogic
): Observable {
  // Logic here
}
