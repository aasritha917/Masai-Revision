const transactions = [
  { id: 1, category: 'Food', amount: 45.50, date: '2024-01-15' },
  { id: 2, category: 'Transport', amount: 20.00, date: '2024-01-16' },
  { id: 3, category: 'Food', amount: 30.75, date: '2024-01-17' },
  { id: 4, category: 'Entertainment', amount: 50.00, date: '2024-01-18' },
  { id: 5, category: 'Food', amount: 25.25, date: '2024-01-19' },
  { id: 6, category: 'Transport', amount: 15.50, date: '2024-01-20' }
];

function aggregateData(transactions){
    const result = {}

    transactions.forEach(tx => {
        const category = tx.category

        if(!result[category]){
            result[category] = {
                total :0,
                count :0,
                Highest: tx.amount,
                lowest: tx.amount
            }
        }
        result[category].total += tx.amount
        result[category].count += 1
        result[category].Highest = Math.max(result[category].Highest,tx.amount)
        result[category].lowest = Math.min(result[category].lowest,tx.amount)
    });
    for (let category in result){
        result[category].average = Number((result[category].total/result[category].count).toFixed(2))
    
    result[category].total = Number(result[category].total.toFixed(2))
   }
   return result;
}

const result = aggregateData(transactions);
console.log(result);