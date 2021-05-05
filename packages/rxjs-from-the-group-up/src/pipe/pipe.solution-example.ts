export function pipe(...fnsList) {
  return (source$) => {
    return fnsList.reduce((lastObs$, fn) => {
      const newObs$ = fn(lastObs$) ;
      return newObs$;
    }, source$);
  };
}
