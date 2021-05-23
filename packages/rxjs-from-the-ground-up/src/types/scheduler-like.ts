import { SchedulerAction } from "./scheduler-action";
import { Subscription } from "./subscription";

export interface SchedulerLike {
  now(): number;
  scheduler<T>(
    work: (this: SchedulerAction<T>, state?: T) => void,
    delay?: number,
    state?: T
  ): Subscription;
}
