import { expect } from "@jest/globals";

// eslint-disable-next-line @typescript-eslint/ban-types
export type ClassWithStaticEquals<T> = Function & {
  equals(left: T, right: T): boolean;
};

function createEqualityTesterForStaticEquals<
  T,
  C extends ClassWithStaticEquals<T>
>(classWithStaticEquals: C): jest.EqualityTester {
  return function (left: T, right: T): boolean | undefined {
    if (
      !(left instanceof classWithStaticEquals) ||
      !(right instanceof classWithStaticEquals)
    ) {
      return;
    }
    return classWithStaticEquals.equals(left, right);
  };
}

export namespace StaticEquality {
  export function addTesterFor<C extends ClassWithStaticEquals<unknown>>(
    classType: C
  ): void {
    const equalityTester = createEqualityTesterForStaticEquals(classType);

    expect.addEqualityTesters([equalityTester]);
  }
}
