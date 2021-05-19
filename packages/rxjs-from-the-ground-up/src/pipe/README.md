---
title: pipe
description: pipe functional utility
origin: original
license: MIT
---

# pipe

A utility function to compose together rxjs operators and combine them into one observable.

1. `pipe` realy should be named `pipeFactory`. When activating it, it build and return a function
   that is the real `pipe` function. When executing the real function, than all
   the operations execute in order.

2. the pipe loop through the given array of functions, and execute them in order. It takes
   the result of the previous function and execute the next function with it.

## Example

```js
import { pipe } from "rxjs";
import { filter, map, of, tap } from "rxjs/operators";

const realPipe = pipe(
  map((num) => num * 10),
  filter((num) => num > 20),
  tap((num) => console.log(num))
);

realPipe(of(1, 2, 3, 4));

// output
// 30
// 40
```

## Example of Simple Function Chaining

```js
const combine = function (fnList) {
  let result;

  fnList.forEach((fn) => {
    result = fn(result);
  });

  return result;
};

console.log(
  combine(
    () => 4,
    (x) => 2 * x,
    (y) => y + 1
  )
);
// 9
```

## References

- https://www.learnrxjs.io/learn-rxjs/concepts/rxjs-primer#pipe
- https://rxjs.dev/api/index/function/pipe
