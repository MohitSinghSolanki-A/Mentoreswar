const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: Number,
  imageUrl: { type: String, default: "https://via.placeholder.com/300x200" },
  isTestSeries: { type: Boolean, default: false },
  subjects: [
    {
      name: String,
      price: Number,
      pdfUrl: String,
    },
  ],
});

module.exports = mongoose.model("Product", productSchema);
