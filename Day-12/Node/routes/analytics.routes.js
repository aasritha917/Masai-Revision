const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

router.get("/analytics", async (req, res) => {
  const result = await Order.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user"
      }
    },
    { $unwind: "$user" },

    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "product"
      }
    },
    { $unwind: "$product" },

    {
      $group: {
        _id: {
          user: "$user.name",
          category: "$product.category"
        },
        totalSpent: { $sum: "$amount" }
      }
    },

    { $sort: { totalSpent: -1 } }
  ]);

  res.json(result);
});

module.exports = router;
