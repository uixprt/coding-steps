---
title: finalize
description: finalize observable operator
origin: original
license: MIT
---

# map

Call a function when observable completes or errors.

## Example

```js
import { interval } from "rxjs";
import { take, finalize } from "rxjs/operators";

//emit value in sequence every 1 second
const source = interval(1000);
//output: 0,1,2,3,4,5....
const example = source.pipe(
  take(5), //take only the first 5 values
  finalize(() => console.log("Sequence complete")) // Execute when the observable completes
);
const subscribe = example.subscribe((val) => console.log(val));
```

## References

- https://www.learnrxjs.io/learn-rxjs/operators/utility/finalize
- https://rxjs.dev/api/operators/finalize
