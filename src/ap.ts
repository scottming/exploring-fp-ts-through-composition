import { pipe } from "fp-ts/function";

const double = (n: number): number => n * 2;

const addC = (x: number) => (y: number) => x + y;

import * as O from "fp-ts/Option";

const liftA2 =
  <B, C, D>(g: (b: B) => (c: C) => D) =>
  (fb: O.Option<B>) =>
  (fc: O.Option<C>): O.Option<D> =>
    pipe(fb, O.map(g), O.ap(fc));

const doubleOneAndAddSomething = pipe(
  O.fromNullable(null),
  O.map(double),
  liftA2(addC)
); /*?*/

doubleOneAndAddSomething(O.some(2)); /*?*/
