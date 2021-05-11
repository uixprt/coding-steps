import {createObservable} from '../../create-observable/solutions/create-observable.solution.starosaur';

export function interval(sliceTime) {
  return createObservable((subscriber) => {
    let counter = 0;

    const intervalId = setInterval(() => {
      subscriber.next(counter);
      counter += 1;
    }, sliceTime);

    return () => clearInterval(intervalId);
  });
}
