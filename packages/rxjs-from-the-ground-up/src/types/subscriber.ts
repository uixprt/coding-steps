export interface Subscriber {
  next: (val: any) => void;
  error: (err: Error) => void;
  complete: () => void;
}
