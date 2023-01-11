import * as E from "fp-ts/lib/Either";
import { pipe } from "fp-ts/function";

type Request = {
  name: string;
  email: string;
};

// class ValidationError extends Error {}
type ValidationError = string;

type ValidateRequest = (request: Request) => E.Either<ValidationError, Request>;

type LowerCaseRequestEmail = (request: Request) => Request;

const validateRequest: ValidateRequest = (request) => {
  if (request.name === "scott") {
    return E.left("scott is not allowed");
  } else {
    return E.right(request);
  }
};

const lowerCaseRequestEmail: LowerCaseRequestEmail = (request) => ({
  name: request.name,
  email: request.email.toLowerCase(),
});

const updateDB = (request: Request): E.Either<ValidationError, Request> => {
  if (request.name === "scott") {
    return E.left("scott is not allowed");
  }

  return E.right(request);
};

// client
const request: Request = { name: "scott", email: "Scott@example.com" };
const result = pipe(
  request,
  validateRequest,
  E.map(lowerCaseRequestEmail),
  E.chain(updateDB),
);

result; //?
// Either<ValidationError, Either<ValidationError, Request>>
