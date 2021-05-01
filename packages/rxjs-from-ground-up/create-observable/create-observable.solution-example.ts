export function createObservable(onSubscribe) {
  const observable = {
    subscribe: (next, error, complete) => {
      const subscriber = {
        next,
        error,
        complete,
        closed: false,
      };

      const cleanupFn = onSubscribe(subscriber) || (() => {});

      return {
        unsubscribe: () => {
          subscriber.closed = true;
          cleanupFn();
        },
      };
    },
  };

  return observable;
}
