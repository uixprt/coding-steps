# fromArray 

Create an observable that emit values provided by the array argument.

## Example

```
import { fromArray } from './from-array';

const array = [10, 20, 30];
const result = fromArray(array);

result.subscribe(x => console.log(x));

// Logs:
// 10
// 20
// 30
```
