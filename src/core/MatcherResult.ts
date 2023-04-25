export type MatcherResult = Readonly<{
  message: () => string;
  pass: boolean;
}>;

export const matcherSuccess: MatcherResult = {
  message: /* istanbul ignore next */ () => "OK",
  pass: true
};
