---
title: Create observable
description: Create observable helper function
origin: original
license: MIT
---

# Observable

An entity that can be subscribed/registred/listened on and in return, provide the subscriber data.

## Observable Interface

1. An observable provides a `subscribe` method to register a listener for its data.

2. When a subscriber register itself to the observable:

  1. the observable start giving it it's data by activating `next(data)`.

  2. After the observable finish the data, it notify the subscriber by activating `complete()`.

```js
import { of } from "rxjs";
const numbers$ = of(1, 2, 3, 4, 5);

numbers$.subscribe({ next: (val) => console.log(val) });
//output: 1,2,3,4,5
```

Example of observable: 

```js
const numbers$ = createObservableFromArray([1,2,3,4]);

function createObservableFromArray(array) {
  return {
    subscribe: (subscriber) => {
      array.forEach(item => subscriber.next(item));
      subscriber.complete();
    },
  };
}
```

## Subscriber Interface

The subscriber to the observable must provide `next`, `error`, and `complete` methods so the observable will be able to:

1. Provide the subscriber data - the `next` method.
2. Or notify the subscriber that an error occured - the `error` method.
3. Or that all the data was provided and no more data left - the `complete` method.

```js
const numbers$ = createObservableFromArray([1,2,3,4]);

numbers$.subscribe({
  next: (data) => {
    console.log("incoming data", data);
  },
  error: (err) => {
    console.log("an error occured", err);
  },
  complete: () => {
    console.log("all data was provided and done. Observation is comlete");
  },
});
```

## Factory Utility - createObservable

The `createObservable` factory utility takes a work function and creates an a simle observable that:

1. When someone subscribe to it, it activate the work function with the subscriber. 
   
   The *work function* is responsible to generate/collect the data and transfer it to 
   the subscriber - with `next`;

2. When someone subscribe to it, it also returns a `subscription` interface with `unsubscribe` function on it. 
   That function, when activated, stop the observable from emiting anymore data to the subscriber.

```js
const numbers$ = createObservable((subscriber) => {
  let i = 0;

  function emit() {
    if (i >= 10) {
      subscriber.complete();
      return;
    }

    subscriber.next(i);
    i += 1;

    setTimeout(() => emit());
  }

  emit();
});
```

```js
const subscription = numbers$.subscribe({
  next: (data) => {
    console.log("incoming data", data);
  },
});

// output: 0

subscription.unsubscribe();

// output: none
```

## Reference

- https://rxjs.dev/api/index/class/Observable
- https://www.learnrxjs.io/learn-rxjs/operators/creation/create
