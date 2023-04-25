import { matcherSuccess } from "./MatcherResult";
import { failMatcherIf } from "./failMatcherIf";

describe("Generating a conditional failure result", () => {
  describe("when the failure condition is false", () => {
    it("should return a successful result", () => {
      const result = failMatcherIf(false, () => "Failure!");

      expect(result.pass).toBeTrue();
      expect(result.message()).toBe(matcherSuccess.message());
    });
  });

  describe("when the failure condition is true", () => {
    it("should return a failure result", () => {
      const failureMessage = "Failure!";
      const result = failMatcherIf(true, () => failureMessage);

      expect(result.pass).toBeFalse();
      expect(result.message()).toBe(failureMessage);
    });
  });
});
