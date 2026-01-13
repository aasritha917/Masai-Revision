const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

router.get("/", async (req, res) => {
  const {
    search,
    categories,
    minPrice,
    maxPrice,
    minRating,
    sortBy = "price",
    order = "asc",
    page = 1,
    limit = 10
  } = req.query;

  let filter = {};

  if (search) {
    filter.$text = { $search: search };
  }

  if (categories) {
    filter.category = { $in: categories.split(",") };
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  if (minRating) {
    filter.rating = { $gte: Number(minRating) };
  }

  const sort = {
    [sortBy]: order === "asc" ? 1 : -1
  };

  const skip = (page - 1) * limit;

  const data = await Product.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(Number(limit));

  const total = await Product.countDocuments(filter);

  res.json({
    total,
    page: Number(page),
    data
  });
});

module.exports = router;
