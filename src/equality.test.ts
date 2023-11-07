import { Equality } from "./equality";

describe("Registering equality", () => {
  class Bear {
    constructor(readonly id: number, readonly name: string) {}

    equals(other: Bear): boolean {
      return this.id == other.id;
    }
  }

  class Letter {
    public static create(id: number, name: string): Letter {
      return new Letter(id, name);
    }

    private constructor(readonly id: number, readonly name: string) {}

    equals(other: Letter): boolean {
      return this.id == other.id;
    }
  }

  beforeAll(() => {
    Equality.addTesterFor(Bear);
    Equality.addTesterFor(Letter);
  });

  describe("for class with public constructor", () => {
    it("should work", () => {
      const initialBear = new Bear(90, "Yogi");

      const laterBear = new Bear(90, "Bubu");

      expect(initialBear).toEqual(laterBear);
      expect(laterBear).toEqual(initialBear);
    });

    describe("when comparing with undefined", () => {
      it("should detect the difference", () => {
        const bear = new Bear(36, "Yogi");

        expect(bear).not.toEqual(undefined);
        expect(undefined).not.toEqual(bear);
      });
    });
  });

  describe("for class with private constructor", () => {
    it("should work", () => {
      const initialLetter = Letter.create(90, "Alpha");

      const laterLetter = Letter.create(90, "Beta");

      expect(initialLetter).toEqual(laterLetter);
      expect(laterLetter).toEqual(initialLetter);
    });

    describe("when comparing with undefined", () => {
      it("should detect the difference", () => {
        const letter = Letter.create(90, "Omega");

        expect(letter).not.toEqual(undefined);
        expect(undefined).not.toEqual(letter);
      });
    });
  });

  describe("when comparing structurally equivalent classes", () => {
    it("should still rely on structuraly equality", () => {
      const id = 36;
      const name = "Yogi";

      const bear = new Bear(id, name);
      const letter = Letter.create(id, name);

      expect(bear).toEqual(letter);
      expect(letter).toEqual(bear);
    });
  });
});

describe("When applying equality test automation", () => {
  class Movie {
    constructor(readonly name: string, readonly year: number) {}

    equals(other: Movie): boolean {
      return this.name == other.name;
    }
  }

  beforeAll(() => {
    Equality.addTesterFor(Movie);
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
