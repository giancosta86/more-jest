export function toHaveSameJson(
  this: jest.MatcherContext,
  actual: unknown,
  expected: unknown
): jest.CustomMatcherResult {
  const { printReceived, printExpected, matcherHint } = this.utils;

  const actualJson = JSON.stringify(actual);
  const expectedJson = JSON.stringify(expected);

  const pass = actualJson === expectedJson;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint(".not.toHaveSameJson") +
          "\n\n" +
          "Expected JSON serialization not equal to:\n" +
          `  ${printExpected(expectedJson)}\n`
        : matcherHint(".toHaveSameJson") +
          "\n\n" +
          "Expected JSON serialization:\n" +
          `  ${printExpected(expectedJson)}\n` +
          "Received JSON serialization:\n" +
          `  ${printReceived(actualJson)}`
  };
}
