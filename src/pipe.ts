import { flow, pipe } from "fp-ts/function";

const add1 = (x: number) => x + 1;
const double = (x: number) => x * 2;
const square = (x: number) => x * x;

// flow is the reversed version of compose
const f = flow(add1, double, square);
f(2); // 36

// pipe is the same as |> in F#, Elixir, OCaml, and so on
// 2 |> add1 |> double |> square // 36
pipe(2, add1, double, square); // 36
