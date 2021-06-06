---
title: tap
description: tap observable operator
origin: original
license: MIT
---

# map

Take the incoming value from the upstream, Transparently perform actions or side-effects, such as logging, and return the same value down the stream.

## Example

```js
import { of } from "rxjs";
import { tap, map } from "rxjs/operators";

const source = of(1, 2, 3, 4, 5);
// transparently log values from source with 'tap'
const example = source.pipe(
  tap((val) => console.log(`BEFORE MAP: ${val}`)),
  map((val) => val + 10),
  tap((val) => console.log(`AFTER MAP: ${val}`))
);

//'tap' does not transform values
//output: 11...12...13...14...15
const subscribe = example.subscribe((val) => console.log(val));
```

## References

- https://rxjs.dev/api/operators/tap
- https://www.learnrxjs.io/learn-rxjs/operators/utility/do
