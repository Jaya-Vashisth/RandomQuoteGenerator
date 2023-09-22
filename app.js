const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const quotes = require("./models/quote");

app = express();
dotenv.config({ path: "./config.env" });
app.set("view engine", "ejs");

db = process.env.DATABASE;

app.use(express.json());
app.use("/static", express.static("public"));

const port = 3000;

//function to generate random quote
generaterandom = async (req, res) => {
  try {
    const totalquote = await quotes.find({});
    const length = totalquote.length;

    const randomIndex = Math.floor(Math.random() * length);

    // console.log(totalquote[randomIndex]["quote"]);

    res.render("index.ejs", { item: totalquote[randomIndex] });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};

//route
app.route("/randomquote").get(generaterandom).post(generaterandom);

mongoose.connect(db).then((con) => {
  console.log("Connected to Database");
});

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
