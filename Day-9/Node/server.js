class QueryOptimizer {
  constructor() {
    this.queryCount = {};
    this.cache = new Map();
  }

  analyzeQuery(query) {
    const keys = Object.keys(query).sort().join("_");
    this.queryCount[keys] = (this.queryCount[keys] || 0) + 1;
  }

  suggestIndexes() {
    return Object.entries(this.queryCount)
      .filter(([_, count]) => count > 1)
      .map(([keys]) => `CREATE INDEX ON table (${keys.replaceAll("_", ", ")})`);
  }

  executeQuery(query, data) {
    const cacheKey = JSON.stringify(query);

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const result = data.filter(row =>
      Object.entries(query).every(
        ([key, value]) => row[key] === value
      )
    );

    this.cache.set(cacheKey, result);
    return result;
  }
}

/* Usage */

const optimizer = new QueryOptimizer();

const queries = [
  { userId: 1, status: "active" },
  { userId: 1, status: "active" },
  { status: "active" },
  { userId: 2 }
];

queries.forEach(q => optimizer.analyzeQuery(q));

console.log("Index Suggestions:");
console.log(optimizer.suggestIndexes());

const data = [
  { userId: 1, status: "active" },
  { userId: 2, status: "inactive" }
];

console.log(
  optimizer.executeQuery({ userId: 1, status: "active" }, data)
);
