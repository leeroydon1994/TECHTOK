const express = require("express");
// const jwt = require("jsonwebtoken"); // JWT

const cors = require("cors"); // CORS - Cross Origin Resource Sharing
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const knexFile = require("../knexfile")[process.env.NODE_ENV || "development"];
const knex = require("knex")(knexFile);

//GET (Rankings)
exports.getRatings = async function (req, res) {
  let stockArray = [];

  // Find the stocks' ids registered
  let stockIds = await knex("user_stock").select("stock_id");

  // Convert the ids into symbols
  let changeIdToSymbols = stockIds.map(async (stockId) => {
    let symbols = await knex("stocks")
      .select("symbol")
      .where("stocks.id", stockId.stock_id);
    stockArray.push(symbols);
  });

  // Send the symbols back to frontend
  Promise.all(changeIdToSymbols).then(() => {
    res.send(stockArray);
  });
};
