import { Observable } from "../../types/observable";

export function pipe(...fnsList: Function[]) {
  return (source$: Observable<any>) => {
    return fnsList.reduce((lastObs$, fn) => {
      const newObs$ = fn(lastObs$);
      return newObs$;
    }, source$);
  };
}
