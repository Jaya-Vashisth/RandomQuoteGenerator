const mongoose = require("mongoose");
const quoteSchema = mongoose.Schema({
  quote: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Quotes", quoteSchema);
