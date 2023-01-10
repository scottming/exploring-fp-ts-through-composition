import * as E from "fp-ts/lib/Either";

type Request = {
  name: string;
  email: string;
};

type ValidationError = string;

// one track input, two tracks output
type ValidateRequest = (request: Request) => E.Either<ValidationError, Request>;

// one track input, one track output
type LowerCaseRequestEmail = (request: Request) => Request;

// Answer
import { pipe } from "fp-ts/function";

const request: Request = { name: "scott", email: "Scott@example.com" };

const validateRequest: ValidateRequest = (request) => E.right(request);
const lowerCaseRequestEmail: LowerCaseRequestEmail = (request) => ({
  name: request.name,
  email: request.email.toLowerCase(),
});

pipe(request, validateRequest, E.map(lowerCaseRequestEmail)); // ? E.right({ name: 'scott', email: 'scott@email.com' })

// transforms functions `B -> C` to functions `Either<B> -> Either<C>`
const map = <B, C, Err>(
  g: (b: B) => C
): ((fb: E.Either<Err, B>) => E.Either<Err, C>) =>
  E.match(
    (err) => E.left(err), // bypass
    (b) => {
      const c = g(b); // do the lowercase
      return E.right(c);
    }
  );

const result = pipe(request, validateRequest, map(lowerCaseRequestEmail)); // ? E.right({ name: 'scott', email: 'scott@email.com' })

const validated = pipe(request, validateRequest);

import * as O from "fp-ts/lib/Option";

// type Option = None | Some<number>

const double = (x: number): number => x * 2;
const square = (x: number): number => x * x;

const two: number | undefined | null = 2;
pipe(O.fromNullable(two), O.map(double), O.map(square)); //? { _tag: 'Some', value: 16 }

const none: number | undefined | null = null;
pipe(O.fromNullable(none), O.map(double), O.map(square)); //? { _tag: 'None'}
