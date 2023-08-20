import { StaticEquality } from "./staticEquality";

class Bear {
  static equals(left: Bear, right: Bear): boolean {
    return left.id == right.id;
  }

  constructor(readonly id: number, readonly name: string) {}
}

class Letter {
  static equals(left: Letter, right: Letter): boolean {
    return left.id == right.id;
  }

  public static create(id: number, name: string): Letter {
    return new Letter(id, name);
  }

  private constructor(readonly id: number, readonly name: string) {}
}

describe("Registering static equality", () => {
  beforeAll(() => {
    StaticEquality.addTesterFor(Bear);
    StaticEquality.addTesterFor(Letter);
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
      //TODO: expect(letter).toEqual(bear);
    });
  });
});
