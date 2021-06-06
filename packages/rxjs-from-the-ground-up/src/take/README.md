---
title: take
description: Take and re-emit only the requested amount of emittions and then complete
origin: original
license: MIT
---

# take

Take and re-emit only the requested amount of emittions and then complete.

## Example

```js
import { of } from "rxjs";
import { take } from "rxjs/operators";

const source = of(1, 2, 3, 4, 5);
const example = source.pipe(take(2));

//'tap' does not transform values
//output: 1...2
const subscribe = example.subscribe((val) => console.log(val));
```

## References

- https://rxjs.dev/api/operators/take
- https://www.learnrxjs.io/learn-rxjs/operators/filtering/take
