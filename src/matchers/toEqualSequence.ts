import { EqualsFunction, Tester } from "@jest/expect-utils";
import { Iterable } from "@giancosta86/stream-utils";

function areEqualSequences(
  actual: Iterable<unknown>,
  expected: Iterable<unknown>,
  equals: EqualsFunction
): boolean {
  const customEqualityTesters: Tester[] = (global as any)[
    Symbol.for("$$jest-matchers-object")
  ].customEqualityTesters;

  return Iterable.equals(actual, expected, (left, right) =>
    equals(left, right, customEqualityTesters)
  );
}

export function toEqualSequence<T>(
  this: jest.MatcherContext,
  actual: Iterable<T>,
  expected: Iterable<T>
): jest.CustomMatcherResult {
  const { printReceived, printExpected, matcherHint } = this.utils;

  const pass = areEqualSequences(actual, expected, this.equals);

  return {
    pass,
    message: () =>
      pass
        ? matcherHint(".not.toEqualSequence") +
          "\n\n" +
          "Expected sequence not equal to:\n" +
          `  ${printExpected(Array.from(expected))}\n` +
          "Received:\n" +
          `  ${printReceived(Array.from(actual))}`
        : matcherHint(".toEqualSequence") +
          "\n\n" +
          "Expected sequence equal to:\n" +
          `  ${printExpected(Array.from(expected))}\n` +
          "Received:\n" +
          `  ${printReceived(Array.from(actual))}`
  };
}
