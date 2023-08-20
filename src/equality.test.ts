import { Equality } from "./equality";
import { StaticEquality } from "./staticEquality";

class Movie {
  static equals(left: Movie, right: Movie): boolean {
    return left.name == right.name;
  }

  constructor(readonly name: string, readonly year: number) {}
}

describe("When applying equality test automation", () => {
  beforeAll(() => {
    StaticEquality.addTesterFor(Movie);
  });

  describe("to numbers", () => {
    Equality.test(
      () => 90,
      () => 7
    );
  });

  describe("to strings", () => {
    Equality.test(
      () => "yogi",
      () => "bubu"
    );
  });

  describe("to plain objects", () => {
    Equality.test(
      () => ({ name: "Yogi", age: 36 }),
      () => ({ name: "Bubu", age: 32 })
    );
  });

  describe("to class with static equality", () => {
    let yearCounter = 2006;

    Equality.test(
      () => new Movie("Yogi", yearCounter++),
      () => new Movie("Bubu", 1997)
    );
  });
});
