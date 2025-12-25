const products = [
  ['Electronics', 'Laptop', 999],
  ['Clothing', 'Shirt', 29],
  ['Electronics', 'Mouse', 25],
  ['Clothing', 'Pants', 49],
  ['Electronics', 'Keyboard', 75],
  ['Clothing', 'Jacket', 89]
];

const result = {}

for (let item of products) {
  const category = item[0]
  const name = item[1]
  const price = item[2]

  if (!result[category]) {
    result[category] = []
  }

  result[category].push({ name, price })
}

for (let category in result) {
  result[category].sort((a, b) => a.price - b.price)
}

console.log(result)
