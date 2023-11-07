# more-jest

_TypeScript utilities for Jest_

![GitHub CI](https://github.com/giancosta86/more-jest/actions/workflows/publish-to-npm.yml/badge.svg)
[![npm version](https://badge.fury.io/js/@giancosta86%2Fmore-jest.svg)](https://badge.fury.io/js/@giancosta86%2Fmore-jest)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](/LICENSE)

**more-jest** is a TypeScript library providing enhanced TypeScript support for Jest.

## Installation

The package on NPM is:

> @giancosta86/omnicourse

The public API entirely resides in the root package index, so you shouldn't reference specific modules.

### Matchers

To use the matchers provided by `more-jest` within a project, one needs to:

1. Add the following attribute to the object exported by `jest.config.js`:

   ```typescript
   setupFilesAfterEnv: ["@giancosta86/more-jest/dist/all"],
   ```

1. Add this line to a `global.d.ts` file within the project root directory:

   ```typescript
   import "@giancosta86/more-jest";
   ```

1. Add `"./global.d.ts"` to the `include` array in `tsconfig.json`

## Usage

### Equality.addTesterFor(classType)

Takes a parameter of class `T` containing a method defined as:

```typescript
equals(other: T): boolean {}
```

and registers into Jest an _equality tester_ that:

- returns `undefined` if either equality operand is not an instance of class `T`

- otherwise, returns calls `optionalEquals()` as defined by [@giancosta86/swanlake](https://github.com/giancosta86/swan-lake)

### Equality.test

Runs a suite of equality-related tests, inside a `describe` block having title «equality».

It takes the following parameters:

- a factory used to create a **reference object** and its _equal copies_

- a factory used to create a **different object**, not equal to the reference instance

### Comparison.test

Runs a suite of comparison-related tests based on a `Comp` algorithm, within a «comparison» `describe` block.

It takes an object with the following parameters:

- `comp`: the `Comp` object to be tested

- `scrambledItems`: the items in any chaotic state

- `sortedItems`: the items in the expected order

### Matchers

- `.toBeTrimmed()`: expects that a string be trimmed

- `.toEqualSequence(expected)`: expects that an iterable has the same items, in the same order, as the given iterable. The iterables can be of different types

- `.toHaveSameJson(expected)`: expects that a value be serialized to JSON as the given object

## See also

- [swan-lake](https://github.com/giancosta86/swan-lake)

- [more-jest-io](https://github.com/giancosta86/more-jest-io) - this library's **I/O**-related counterpart

- [jest-extended](https://jest-extended.jestcommunity.dev/) - Additional Jest matchers
