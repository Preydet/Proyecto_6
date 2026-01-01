require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");
const userRouter = require("./src/routes/user.routes");
const productRouter = require("./src/routes/product.routes");
const PORT = process.env.PORT || 5000;
const app = express();

connectDB();

//middlewares
app.use(express.json());

app.use("/users", userRouter);

app.use("/products", productRouter);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto` + PORT) ;
});