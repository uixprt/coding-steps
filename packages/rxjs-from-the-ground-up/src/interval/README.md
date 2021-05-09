# interval

Create an observable that emit an ever increasing sequential number starting from 0. The observable emit in pulses defined the the provided interval time, .

## Example

```js
import { interval } from './interval';

//emit value in sequence every 1 second
const source = interval(1000);

const subscribe = source.subscribe(val => console.log(val));
//output: 0,1,2,3,4,5....
```

## References

* https://www.learnrxjs.io/learn-rxjs/operators/creation/interval
* https://rxjs.dev/api/index/function/interval
