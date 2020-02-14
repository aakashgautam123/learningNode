const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//making separate files for user and product routes and requiring them
const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const app = express();

//using body parse for parsing request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//we need to use the routes and give them a prefix such that if you want to access /register of userRoutes
// you need to send request in localhost:8080/user/register
app.use("/user", userRoutes);
app.use("/product", productRoutes);
//connecting to datbase
async function connect() {
  const db = await mongoose.connect(process.env.MONGO_URL);
}

connect();

app.listen(process.env.PORT || 3000, function() {
  console.log("server started listening at port 3000");
});
