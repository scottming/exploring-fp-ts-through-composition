import * as O from "fp-ts/lib/Option";
import { pipe } from "fp-ts/function";

const double = (x: number): number => x * 2;
const square = (x: number): number => x * x;

const n: number = 1;
const none: number | undefined | null = null;

// composition 1
pipe(n, double, square);
// -> number -> number -> number

// composition 2
pipe(O.fromNullable(none), O.map(double), O.map(square));
//       -> Option          -> Option      -> Option

// composition 3

// const add = (a: number, b: number): number => a + b;

const add = (a: number) => (b: number) => a + b;
// increment(1); // ? -> 2

import { ap } from "fp-ts/lib/Identity";
const result = pipe(1, add, ap(1));
//              -> add1 function -> number -> number

const effectWorldWithAp = pipe(O.some(1), O.map(add), O.ap(O.some(1))); //?

const liftA2 =
  <B, C, D>(g: (b: B) => (c: C) => D) =>
  (fb: O.Option<B>) =>
  (fc: O.Option<C>): O.Option<D> =>
    pipe(fb, O.map(g), O.ap(fc));

const number = 1;
pipe(O.some(number), liftA2(add))(O.some(1));
