# more-jest

_TypeScript matchers and utilities for Jest_

![GitHub CI](https://github.com/giancosta86/more-jest/actions/workflows/publish-to-npm.yml/badge.svg)
[![npm version](https://badge.fury.io/js/@giancosta86%2Fmore-jest.svg)](https://badge.fury.io/js/@giancosta86%2Fmore-jest)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](/LICENSE)

**more-jest** is a TypeScript library providing additional _matchers_ for Jest as well as types and utilities for creating _custom matchers_; consequently, it serves as the fundamental building block for dedicated libraries like [more-jest-io](https://github.com/giancosta86/more-jest-io).

## Installation

```bash
npm install @giancosta86/more-jest
```

or

```bash
yarn add @giancosta86/more-jest
```

The public API entirely resides in the root package index, so one shouldn't reference specific modules.

### Global matchers

In order to be able to access the custom matchers provided by this library within any test file in your project, please follow these steps:

1. Create a declaration file (for example, `global.d.ts`) in the root directory of your project, containing the following line:

   ```typescript
   import "@giancosta86/more-jest";
   ```

1. In the `jest.config.js` configuration file, add an entry to the `setupFilesAfterEnv` array field:

   ```typescript
   module.exports = {
     setupFilesAfterEnv: ["@giancosta86/more-jest/all"]
   };
   ```

## Matchers

- `toBeTrimmed()`: ensures that the received string contains neither leading nor trailing spaces:

  ```typescript
  expect("DODO").toBeTrimmed(); //OK

  expect("   DODO").toBeTrimmed(); //FAILURE!

  expect("DODO   ").toBeTrimmed(); //FAILURE!
  ```

## TypeScript utilities

more-jest provides:

- the `MatcherResult` readonly type - which should be the return type of custom matcher handlers

- the `failMatcherIf()` function, designed to be called as the return value of custom matcher handlers

- the `matcherSuccess` constant - to be returned by more sophisticated matcher handlers

## Further references

- [more-jest-io](https://github.com/giancosta86/more-jest-io) - TypeScript I/O matchers and utilities for Jest
