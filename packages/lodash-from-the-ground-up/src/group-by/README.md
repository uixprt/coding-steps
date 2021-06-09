---
title: groupBy
description: Creates an object composed of keys generated from the results of running each element of `collection` thru `iteratee`. The order of grouped values is determined by the order they occur in `collection`.
The corresponding value of each key is an array of elements responsible for generating the key. The iteratee is invoked with one argument: (value).
origin: https://github.com/lodash/lodash/blob/master/groupBy.js
license: https://github.com/lodash/lodash/blob/master/LICENSE
---

# groupBy

Creates an object composed of keys generated from the results of running each element of `collection` thru `iteratee`. The order of grouped values is determined by the order they occur in `collection`.
The corresponding value of each key is an array of elements responsible for generating the key. The iteratee is invoked with one argument: (value).

## Example

```js
_.groupBy([6.1, 4.2, 6.3], Math.floor);
// => { '4': [4.2], '6': [6.1, 6.3] }

// The `_.property` iteratee shorthand.
_.groupBy(["one", "two", "three"], "length");
// => { '3': ['one', 'two'], '5': ['three'] }
```
