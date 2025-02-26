const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/auth.js");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/products.js");
const paymentRoutes = require("./routes/paymentRoutes");

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payment", paymentRoutes);

app.listen(3001, () => console.log("Server running on port 3001"));
