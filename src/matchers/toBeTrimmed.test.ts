describe("Expecting a string to be trimmed", () => {
  describe("when the string has leading space", () => {
    it("should fail", () =>
      expect(() => {
        expect("   Dodo").toBeTrimmed();
      }).toThrow("Expected trimmed string"));
  });

  describe("when the string has trailing space", () => {
    it("should fail", () =>
      expect(() => {
        expect("Dodo      ").toBeTrimmed();
      }).toThrow("Expected trimmed string"));
  });

  describe("when the string is trimmed", () => {
    it("should succeed", () => expect("Dodo").toBeTrimmed());
  });
});
