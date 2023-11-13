import { expect } from "@jest/globals";
import { AnyClass, HasEquals, Optional } from "@giancosta86/swan-lake";

function createEqualityTesterFor<T extends HasEquals>(
  classType: AnyClass
): jest.EqualityTester {
  return function (left: T, right: T): boolean | undefined {
    if (!(left instanceof classType) || !(right instanceof classType)) {
      return;
    }
    return Optional.equals(left, right);
  };
}

export namespace Equality {
  export function addTesterFor(classType: AnyClass): void {
    const equalityTester = createEqualityTesterFor(classType);

    expect.addEqualityTesters([equalityTester]);
  }

  export function test<T>(factory: () => T, differentFactory: () => T) {
    describe("equality", () => {
      it("should work", () => {
        const left = factory();
        const right = factory();

        expect(left).toEqual(right);
        expect(right).toEqual(left);
      });

      it("should support arrays", () => {
        const leftArray = [factory()];
        const rightArray = [factory()];

        expect(leftArray).toEqual(rightArray);
        expect(rightArray).toEqual(leftArray);
      });

      it("should detect differences", () => {
        const value = factory();
        const different = differentFactory();

        expect(value).not.toEqual(different);
        expect(different).not.toEqual(value);
      });

      it("should detect undefined", () => {
        const value = factory();

        expect(value).not.toEqual(undefined);
        expect(undefined).not.toEqual(value);
      });
    });
  }
}
