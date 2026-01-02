function flattenArray(arr) {
  let result = [];

  for (let item of arr) {
    if (Array.isArray(item)) {
      result.push(...flattenArray(item));
    } else {
      result.push(item);
    }
  }

  return result;
}

const nested = [1, [2, [3, [4, 5]], 6], [7, 8], 9, [[10]]];
console.log(flattenArray(nested));
