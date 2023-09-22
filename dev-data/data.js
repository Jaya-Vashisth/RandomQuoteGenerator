const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const quotes = require("./../models/quote");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE;

mongoose.connect(DB).then((con) => {
  console.log("DB connection successful");
});

const quote = JSON.parse(fs.readFileSync(`${__dirname}/quote.json`, "utf-8"));

const importData = async () => {
  try {
    await quotes.create(quote);
    console.log("Data successfully loaded");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//delete all data from DB
const deleteData = async () => {
  try {
    await quotes.deleteMany();
    console.log("Data successfully deleted");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
console.log(process.argv);
