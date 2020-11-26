//Définition des modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const passport = require("./config/setup");

async function connectdb() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  mongoose
  .connect("mongodb://admin:adpass@mongo/admin")
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((e) => {
    console.log("Error while DB connecting");
    console.log(e);
    connectdb();
  });
}

connectdb();

const urlencodedParser = bodyParser.urlencoded({
  extended: true
});
app.use(urlencodedParser);

app.use(bodyParser.json());


app.use(function(req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

const router = express.Router();

app.use("/user", router);
router.get('/',function(req,res){
  res.json("Hello World")
})

require(__dirname + "/controllers/userController")(router);

const port = 28000;
app.listen(port, () => console.log(`Listening on port ${port}`));