let { products, idCounter } = require("../data/products");

exports.createProduct = (req, res) => {
  const { name, price, category } = req.body;

  const newProduct = {
    id: idCounter++,
    name,
    price,
    category
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
};

exports.getProducts = (req, res) => {
  let result = [...products];

  const {
    search,
    category,
    sortBy,
    order = "asc",
    page = 1,
    limit = 5
  } = req.query;

  if (search) {
    result = result.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (category) {
    result = result.filter(p => p.category === category);
  }

  if (sortBy) {
    result.sort((a, b) => {
      return order === "asc"
        ? a[sortBy] - b[sortBy]
        : b[sortBy] - a[sortBy];
    });
  }

  const start = (page - 1) * limit;
  const end = start + Number(limit);

  res.json({
    total: result.length,
    data: result.slice(start, end)
  });
};

exports.updateProduct = (req, res) => {
  const product = products.find(p => p.id == req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  Object.assign(product, req.body);
  res.json(product);
};

exports.deleteProduct = (req, res) => {
  products = products.filter(p => p.id != req.params.id);
  res.json({ message: "Product deleted successfully" });
};
