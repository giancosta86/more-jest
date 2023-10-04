export function toBeTrimmed(
  this: jest.MatcherContext,
  actual: string
): jest.CustomMatcherResult {
  const { printReceived, matcherHint } = this.utils;

  const pass = actual.trim() === actual;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint(".not.toBeTrimmed") +
          "\n\n" +
          "Expected non-trimmed string, received:\n" +
          `  ${printReceived(actual)}`
        : matcherHint(".toBeTrimmed") +
          "\n\n" +
          "Expected trimmed string, received:\n" +
          `  ${printReceived(actual)}`
  };
}
