module.exports = {
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"]
  },

  setupFilesAfterEnv: ["./src/all.ts"],

  testPathIgnorePatterns: ["<rootDir>/dist/", "/_.+"]
};
