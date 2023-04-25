import { MatcherResult, matcherSuccess } from "./MatcherResult";

export function failMatcherIf(
  failureCondition: boolean,
  failureMessageProvider: () => string
): MatcherResult {
  return failureCondition
    ? {
        message: failureMessageProvider,
        pass: false
      }
    : matcherSuccess;
}
