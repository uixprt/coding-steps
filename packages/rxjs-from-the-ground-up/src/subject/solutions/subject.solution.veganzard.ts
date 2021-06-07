import { Subscriber } from "../../types/subscriber";
import { ISubject } from "../../types/ISubject";

export function createSubject(): ISubject {
  const subscribers = new Map();
  const subject: ISubject = {
    next: (val: any) => {
      subscribers.forEach((subscriber) => {
        subscriber.next(val);
      });
    },
    complete: () => {
      subscribers.forEach((subscriber) => {
        subscriber.complete();
      });
    },
    error: (err: Error) => {
      subscribers.forEach((subscriber) => {
        subscriber.error(err);
      });
    },
    subscribe: (subscriber: Subscriber) => {
      subscribers.set(subscriber, subscriber);

      return {
        unsubscribe: () => {
          subscribers.delete(subscriber);
        },
      };
    },
  };

  return subject;
}
