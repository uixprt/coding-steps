import { Subscriber } from "../types/subscriber";
import { TeardownLogic } from "../types/teardown-logic";
import { Observable } from "../types/observable";

export function createObservable(
  onSubscribe: (subscriber: Subscriber) => TeardownLogic
): Observable {
  const observable = {
    // Logic here
  };
}
