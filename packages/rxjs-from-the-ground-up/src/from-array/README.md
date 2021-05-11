---
title: fromArray
description: fromArray observable generator
origin: original
license: MIT
---

# fromArray

Create an observable that emit values provided by the array argument.

## Example

```js
import { fromArray } from "./from-array";

const array = [10, 20, 30];
const result = fromArray(array);

result.subscribe((x) => console.log(x));

// Logs:
// 10
// 20
// 30
```

## References

https://www.learnrxjs.io/learn-rxjs/operators/creation/from
https://rxjs.dev/api/index/function/from
