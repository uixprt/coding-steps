---
title: of
description: of observable generator
origin: original
license: MIT
---

# Of - Observable Creator

Create an observable that emit the arguments provided in sequence and then emit complete.

## Example 

```js
// RxJS v6+
import { of } from 'rxjs';
//emits any number of provided values in sequence
const source = of(1, 2, 3, 4, 5);
//output: 1,2,3,4,5
const subscribe = source.subscribe(val => console.log(val));
```

## Reference

- https://rxjs.dev/api/index/function/of
- https://www.learnrxjs.io/learn-rxjs/operators/creation/of
