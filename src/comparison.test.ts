import { Comp } from "@rimbu/common";
import { Comparison } from "./comparison";

class Letter {
  constructor(readonly name: string) {}
}

function createLetterComp(): Comp<Letter> {
  return {
    compare(left: Letter, right: Letter): number {
      return left.name.localeCompare(right.name);
    },

    isComparable(obj): obj is Letter {
      return obj instanceof Letter;
    }
  };
}

describe("When applying comparison test automation", () => {
  describe("to numbers", () => {
    Comparison.test({
      comp: Comp.numberComp(),
      scrambledItems: [4, 90, 1, 6, 80, 100, 2],
      sortedItems: [1, 2, 4, 6, 80, 90, 100]
    });
  });

  describe("to strings", () => {
    Comparison.test({
      comp: Comp.stringComp(),
      scrambledItems: ["beta", "alpha", "xi", "gamma"],
      sortedItems: ["alpha", "beta", "gamma", "xi"]
    });
  });

  describe("to class with custom Comp", () => {
    Comparison.test({
      comp: createLetterComp(),
      scrambledItems: [
        new Letter("beta"),
        new Letter("alpha"),
        new Letter("xi"),
        new Letter("gamma")
      ],
      sortedItems: [
        new Letter("alpha"),
        new Letter("beta"),
        new Letter("gamma"),
        new Letter("xi")
      ]
    });
  });
});
