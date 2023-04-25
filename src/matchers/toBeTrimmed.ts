import { MatcherContext } from "expect";
import { MatcherResult, failMatcherIf } from "../core";

const leadingSpaceRegex = /^\s+/;

const trailingSpaceRegex = /\s+$/;

export function toBeTrimmed(
  this: MatcherContext,
  received: string
): MatcherResult {
  const untrimmed =
    received.match(leadingSpaceRegex) ?? received.match(trailingSpaceRegex);

  return failMatcherIf(
    untrimmed !== null,

    () =>
      `Expected trimmed string\nReceived: ${this.utils.printReceived(
        received
      )}\n\n`
  );
}
