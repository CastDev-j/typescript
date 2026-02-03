//pseudocode

// define an array a with values [1, 2, 3, 4]
// define an array b as the reverse of array a

// print both arrays a and b to the console

const a = Array.from({ length: 4 }).map((_, i) => i + 1);

const b = a.reverse() || a.map((_, i) => a.length - i);

console.log({ a, b });
