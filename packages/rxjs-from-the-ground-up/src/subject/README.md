# Subject

Subject is a special type of Observable that allows values to be
multicasted to many Observers. While plain Observables are unicast
(each subscribed Observer owns an independent execution of the
Observable), Subjects are multicast.

Subjects are like EventEmitters - they maintain in a registry of
many listeners.

As every subject is an observable, it also an object the methods:
next(), complete(), error().

To feed a new value to the Subject, just call next(theValue),
and it will be multicasted to the Observers registered to listen
to the Subject.

## Example

```javascript
import { Subject } from 'rxjs';

const subject = new Subject<number>();

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});
subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`)
});

subject.next(1);
subject.next(2);

// Logs:
// observerA: 1
// observerB: 1
// observerA: 2
// observerB: 2
```
