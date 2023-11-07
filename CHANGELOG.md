## Version 4

- `ClassWithStaticEquals` is no more exported

- `StaticEquality` exists no more; in particular, its `addTesterFor` now belongs to the `Equality` namespaces - and client classes must turn their `static equals(left, right)` into a non-static `equals(other)` method.

## Version 3

- `.toBeSameSequence()` renamed to `.toEqualSequence()`

- Revised error messages

## Version 2

- The previous matchers are no more available, since they have been proposed as pull requests to jest-extended
