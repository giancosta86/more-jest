import { EqualsFunction, Tester } from "@jest/expect-utils";

const JEST_MATCHERS_OBJECT = Symbol.for("$$jest-matchers-object");

function areSameSequence(
  actual: Iterable<unknown>,
  expected: Iterable<unknown>,
  equals: EqualsFunction
): boolean {
  const expectedIterator = expected[Symbol.iterator]();

  for (const actualItem of actual) {
    const expectedStep = expectedIterator.next();

    if (expectedStep.done) {
      return false;
    }

    const expectedItem = expectedStep.value;

    const customEqualityTesters: Tester[] = (global as any)[
      JEST_MATCHERS_OBJECT
    ].customEqualityTesters;

    if (!equals(actualItem, expectedItem, customEqualityTesters)) {
      return false;
    }
  }

  return !!expectedIterator.next().done;
}

export function toBeSameSequence<T>(
  this: jest.MatcherContext,
  actual: Iterable<T>,
  expected: Iterable<T>
): jest.CustomMatcherResult {
  const { printReceived, printExpected, matcherHint } = this.utils;

  const pass = areSameSequence(actual, expected, this.equals);

  return {
    pass,
    message: () =>
      pass
        ? matcherHint(".not.toBeSameSequence") +
          "\n\n" +
          "Expected different sequence from:\n" +
          `  ${printExpected(Array.from(expected))}\n` +
          "Received:\n" +
          `  ${printReceived(Array.from(actual))}`
        : matcherHint(".toBeSameSequence") +
          "\n\n" +
          "Expected same sequence as:\n" +
          `  ${printExpected(Array.from(expected))}\n` +
          "Received:\n" +
          `  ${printReceived(Array.from(actual))}`
  };
}
