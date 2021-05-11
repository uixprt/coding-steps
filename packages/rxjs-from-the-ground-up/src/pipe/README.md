---
title: pipe
description: pipe functional utility
origin: original
license: MIT
---

# pipe

A utility function to compose together rxjs operators and combine them into one observable.

## Example

```js
import {pipe} from 'rxjs';
import {filter, map, of, tap} from 'rxjs/operators';

pipe(
  map((num) => num * 10),
  filter(num => num > 20),
  tap(num => console.log(num))
)(of(1,2,3,4));

// output
// 30
// 40
```

## References

- https://www.learnrxjs.io/learn-rxjs/concepts/rxjs-primer#pipe
- https://rxjs.dev/api/index/function/pipe
