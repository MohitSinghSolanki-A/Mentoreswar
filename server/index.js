const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/auth.js");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/products.js");
const paymentRoutes = require("./routes/paymentRoutes");
const emailRoutes = require("./routes/emailroute.js");
const uploadRoutes = require("./routes/uploadRoutes");




dotenv.config();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // Allow only your frontend
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));
app.use(express.json());
app.use(bodyParser.json());



app.use("/api/uploads", uploadRoutes);
app.use("/api/call", emailRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payment", paymentRoutes);

app.listen(3001, () => console.log("Server running on port 3001"));
connectDB();
