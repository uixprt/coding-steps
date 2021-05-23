import { MonoTypeOperatorFunction } from "../types/mono-type-operator-function";
import { SchedulerLike } from "../types/scheduler-like";

export function debounceTime<T>(
  dueTime: number,
  scheduler: SchedulerLike
): MonoTypeOperatorFunction<T> {}
