import { Comp } from "@rimbu/common";
import { List } from "@rimbu/list";

export namespace Comparison {
  export type TestParams<T> = Readonly<{
    comp: Comp<T>;
    scrambledItems: Iterable<T>;
    sortedItems: Iterable<T>;
  }>;

  export function test<T>({
    comp,
    scrambledItems,
    sortedItems
  }: TestParams<T>) {
    describe("comparison", () => {
      it("should ensure sorting", () => {
        const sortedList = List.from(scrambledItems).sort(comp);

        expect(sortedList.toArray()).toEqual(sortedItems);
      });

      it("should satisfy isComparable()", () => {
        const iterator = scrambledItems[Symbol.iterator]();

        for (;;) {
          const { value, done } = iterator.next();

          if (done) {
            break;
          }

          const isComparable = comp.isComparable(value);

          expect(isComparable).toBe(true);
        }
      });
    });
  }
}
