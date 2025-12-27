require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");
const PORT = process.env.PORT || 5000;
const app = express();

connectDB();

//middlewares
app.use(express.json());



app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto` + PORT) ;
});