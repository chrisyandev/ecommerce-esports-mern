const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  productId: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: true,
  },
});

module.exports = {
  OrderItem: mongoose.model("OrderItem", OrderItemSchema),
  OrderItemSchema,
};