export namespace Equality {
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
