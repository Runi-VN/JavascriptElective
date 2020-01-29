let argArray = process.argv;
let total = 0;
for (let index = 2; index < argArray.length; index++) {
  const element = argArray[index];
  total += +element;
}
console.log(total);
