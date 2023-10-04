// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare namespace jest {
  interface Matchers<R> {
    toBeTrimmed(): R;
    toEqualSequence(expected: Iterable<unknown>): R;
    toHaveSameJson(expected: unknown): R;
  }
}
