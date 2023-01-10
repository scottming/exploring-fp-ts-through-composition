const inverse = (n: number): number => {
  if (n === 0) throw new Error("cannot divide by zero");
  return 1 / n;
};

const x = inverse(0) + 1;

// represents a failure
interface Left<E> {
  readonly _tag: "Left";
  readonly left: E;
}

// represents a success
interface Right<A> {
  readonly _tag: "Right";
  readonly right: A;
}

type Either<E, A> = Left<E> | Right<A>;

type None = {
  readonly _tag: "None";
};

type Some<A> = {
  readonly _tag: "Some";
  readonly value: A;
};

type Option<A> = None | Some<A>;
