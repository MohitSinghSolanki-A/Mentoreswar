const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: Number,
  isTestSeries: { type: Boolean, default: false },
  subjects: [
    {
      name: String,
      price: Number,
    },
  ],
});

module.exports = mongoose.model("Product", productSchema);
