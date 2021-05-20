---
title: map
description: map observable operator
origin: original
license: MIT
---

# map

Take the incoming value from the upstream, apply a custom tranformation on it, and return the new value down the stream.

## Example

```js
import { of } from "rxjs";
import { map } from "rxjs/operators";

const numbers$ = of(1, 2, 3, 4, 5);

numbers$.pipe(map((number) => number * 10)).subscribe({
  next: (val) => {
    console.log("next: ", val);
  },
});

// output:
// 10
// 20
// 30
// 40
// 50
```

## Understanding Operators

Operators are just functions that create and return a function only. That function is then used to create the target observable from the source observable and doing some logic between.

Map therefore is actually a factory function - `mapFactory` kind of. 

1. It only creates and return a function. 
2. That returned function is then used to create a target observable that `maps` over the source observable.

```js
const numbersSetA$ = of(1, 2, 3, 4, 5);
const numbersSetB$ = of(7, 8, 9, 10);

const createObservableOfNumPowerTen = map((x) => x * 10); 
const numPowerTenA$ = createObservableOfNumPowerTen(numbersSetA$);
const numPowerTenB$ = createObservableOfNumPowerTen(numbersSetB$);

numPowerTenA$.subscribe({ next: (x) => console.log(x) });
// 10, 20, 30, 40, 50

numPowerTenB$.subscribe({ next: (x) => console.log(x) });
// 70, 80, 90, 100
```

## References

- https://rxjs.dev/api/operators/map
- https://www.learnrxjs.io/learn-rxjs/operators/transformation/map
