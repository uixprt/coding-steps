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

## References

- https://rxjs.dev/api/operators/map
- https://www.learnrxjs.io/learn-rxjs/operators/transformation/map
