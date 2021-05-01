export function createObservable(onSubscribe) {
  const observable = {
    subscribe: (next, error, complete) => {
      const subscriber = {
        next,
        error,
        complete
      };

      return onSubscribe(subscriber);
    }
  };

  return observable;
}
