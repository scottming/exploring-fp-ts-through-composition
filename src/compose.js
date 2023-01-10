function add1(x) {
  return x + 1;
}

function double(x) {
  return x * 2;
}

function square(x) {
  return x * x;
}

// normal composition
const added1 = add1(2);
const added1AndDoubled = double(added1);
const squareed = square(added1AndDoubled);
added1AndDoubled // 6


// compose2
const compose2 = (f, g) => x => f(g(x));
const add1AndDouble = compose2(double, add1);

add1AndDouble(2) // 6 


// compose
function compose(...fns) {
  return fns.reduce((f, g) => (...args) => f(g(...args)));
}

compose(square, double, add1)(2); // 36

// 2 |> add1 |> double |> square // 36