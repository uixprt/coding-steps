import { Subscription } from "./subscription";
import { TeardownLogic } from "./teardown-logic";

export interface SchedulerAction<T> extends Subscription {
  schedule(state?: T, delay?: number): Subscription;

  EMPTY: Subscription;
  constructor(unsubscribe?: () => void);
  closed: object;
  unsubscribe(): void;
  add(teardown: TeardownLogic): Subscription;
  remove(subscription: Subscription): void;
}
