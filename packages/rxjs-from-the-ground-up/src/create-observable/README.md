---
title: Create observable
description: Create observable helper function
origin: original
license: MIT
---

# Observable

An entity that can be subscribed/registred/listened on and in return, provide the subscriber data.

## Observable Interface

The observable provide a 'subscribe' method to register a listener for its data.

When a subscriber register it self to the observable, the observable start giving it it's data.

```js
const numberObservable$ = createNumberObservable();

numberObservable$.subscribe(function next(data) {
  console.log("incoming data", data);
});
```

## Subscriber Interface

The subscriber to the observable must provide `next`, `error`, and `complete` methods so the observable will be able to:

1. Provide the subscriber data - the `next` method.
2. Or notify the subscriber that an error occured - the `error` method.
3. Or that all the data was provided and no more data left - the `complete` method.

```js
const numberObservable$ = createNumberObservable();

numberObservable$.subscribe(
  function next(data) {
  console.log('incoming data', data);
}, function error(err) {
  console.log('an error occured', err);
}, function complete() {
  console.log('all data was provided and done. Observation is comlete');
});

## Reference

- https://rxjs.dev/api/index/class/Observable
- https://www.learnrxjs.io/learn-rxjs/operators/creation/create
```
