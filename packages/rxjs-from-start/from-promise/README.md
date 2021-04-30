# fromPromise

Create an observable that emit values provided by the promise argument.

## Example

```
import { fromPromise } from './fromPromise';

const promiseSource = fromPromise(new Promise(resolve => resolve('Hello World!')));

const subscribe = promiseSource.subscribe(val => console.log(val));
//output: 'Hello World'
```
