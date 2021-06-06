# drop

---

This implementation contains lodash drop and dropRight together.
If you want dropRight you must pass the true (for isRight) as third parameter to drop function.

```javascript
// drop
drop([1, 2, 3, 4, 5], 2);
// dropRight
drop([1, 2, 3, 4, 5], 2, true);
```

---

**drop** - creates a slice of array with n elements dropped from the beginning.

### Example

```javascript
_.drop([1, 2, 3]);
// => [2, 3]

_.drop([1, 2, 3], 2);
// => [3]

_.drop([1, 2, 3], 5);
// => []

_.drop([1, 2, 3], 0);
// => [1, 2, 3]
```

**dropRight** - creates a slice of array with n elements dropped from the end.

### Example

```javascript
_.dropRight([1, 2, 3]);
// => [1, 2]

_.dropRight([1, 2, 3], 2);
// => [1]

_.dropRight([1, 2, 3], 5);
// => []

_.dropRight([1, 2, 3], 0);
// => [1, 2, 3]
```
