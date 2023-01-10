// type Option<A> = None | Some<A>

// interface TaskEither<E, A> extends Task<Either<E, A>> {}

import * as E from "fp-ts/lib/Either";

type Request = {
  name: string;
  email: string;
};

type ValidationError = string;

// one track input, two tracks output
type validateRequest = (request: Request) => E.Either<ValidationError, Request>;

// one track input, one track output
type lowerCaseRequestEmail = (request: Request) => Request;


// request  |> validateRequest |> lowerCaseRequestEmail |> updateDB