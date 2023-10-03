// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare namespace jest {
  interface Matchers<R> {
    toBeSameSequence(expected: Iterable<unknown>): R;
    toBeTrimmed(): R;
    toHaveSameJson(expected: unknown): R;
  }
}
