const transactions = [
  {
    date: '2024-01-15',
    category: 'Food',
    items: [
      { name: 'Groceries', amount: 50 },
      { name: 'Restaurant', amount: 75 }
    ]
  },
  {
    date: '2024-01-16',
    category: 'Transport',
    items: [
      { name: 'Gas', amount: 40 },
      { name: 'Parking', amount: 10 }
    ]
  },
  {
    date: '2024-01-17',
    category: 'Food',
    items: [
      { name: 'Coffee', amount: 5 }
    ]
  }
];

const result = {};

transactions.forEach(({ category, items }) => {
  if (!result[category]) {
    result[category] = { total: 0, count: 0 };
  }

  items.forEach(item => {
    result[category].total += item.amount;
    result[category].count += 1;
  });
});

console.log(result);
