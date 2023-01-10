import * as E from "fp-ts/lib/Either";
import { pipe } from "fp-ts/function";
import { sequenceT, sequenceS } from "fp-ts/lib/Apply";
import * as A from "fp-ts/Array";

type RegisterInput = {
  email: string;
  password: string;
};

class ValidationError extends Error {
  _tag = "ValidationError";

  constructor(message: string) {
    super(message);
  }

  static of(message: string): ValidationError {
    return new ValidationError(message);
  }
}

function validateEmail(email: string): E.Either<ValidationError, string> {
  const expression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return expression.test(email)
    ? E.right(email)
    : E.left(ValidationError.of("email is invalid"));
}

function validatePassword(password: string): E.Either<ValidationError, string> {
  return password.length > 8
    ? E.right(password)
    : E.left(ValidationError.of("password's length is less than 8"));
}

const input: RegisterInput = {
  email: "haha@example.c",
  password: "123456",
};

const result = pipe(input, ({ email, password }) =>
  sequenceS(E.Applicative)({
    email: validateEmail(email),
    password: validatePassword(password),
  })
);

// result;

const result1 = A.sequence(E.Applicative)([
  validateEmail(input.email),
  validatePassword(input.password),
]); /*?*/

sequenceT(E.Applicative)(E.left(1), E.left(2)); /*?*/

import { traverse } from "fp-ts/Array";
import { Applicative, left, right } from "fp-ts/lib/Either";

const f = (x: unknown) =>
  typeof x === "string"
    ? right(x.toUpperCase())
    : left(new Error(`${x} not a string`));

traverse(Applicative)(f)([1, 5]); /*?*/

type Request = {
  name: string;
  email: string;
};

type validateRequest = (request: Request) => E.Either<ValidationError, Request>;
type lowerCaseRequestEmail = (request: Request) => Request;
