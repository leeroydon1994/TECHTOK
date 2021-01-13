const express = require("express");
const jwt = require("jsonwebtoken"); // JWT

const cors = require("cors"); // CORS - Cross Origin Resource Sharing
const bodyParser = require("body-parser");
const config = require("../config");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const knexFile = require("../knexfile")["development"];
const knex = require("knex")(knexFile);

// For all methods, return the stock array back to frontend
async function getStockArray(decoded, res) {
  let stockArray = [];
  console.log("GET");

  // Find the stocks' ids registered with a particular user
  let stockIds = await knex("user_stock").select("stock_id").where("user_id", decoded.id);
  console.log(stockIds, "P");

  // Convert the ids into symbols
  let changeIdToSymbols = stockIds.map(async (stockId) => {
    let symbols = await knex("stocks").select("symbol").where("stocks.id", stockId.stock_id);
    stockArray.push(symbols);
  });

  // Send the symbols back to frontend
  Promise.all(changeIdToSymbols).then(() => {
    console.log(stockArray, "Q");
    res.send(stockArray);
  });
}

//GET
exports.getFave = async function (req, res) {
  let token = req.headers.authorization.split(" ")[1];
  console.log(token);
  let decoded = jwt.verify(token, config.jwtSecret);
  console.log(decoded);

  getStockArray(decoded, res);
};

// POST
exports.postFave = async function (req, res) {
  let token = req.headers.authorization.split(" ")[1];
  console.log(token);
  let decoded = jwt.verify(token, config.jwtSecret);
  console.log(decoded);

  let { company, symbol } = req.body;
  console.log("POST", company, symbol);

  // Check if the stock id exists by seraching its symbol
  let idQuery = await knex("stocks").select("id").where("symbol", symbol);
  console.log(idQuery);
  // If no results are found, insert the stock data
  if (idQuery.length === 0) {
    return knex("stocks")
      .insert({ company: company, symbol: symbol })
      .returning("id")
      .then((data) => {
        console.log(data, "X");
        return knex("user_stock").insert({ user_id: decoded.id, stock_id: data[0] }).returning("id");
      })
      .then((data) => {
        console.log(data, "70");
        getStockArray(decoded, res);
      })
      .catch((err) => console.log(err));
    //If the stock is in the stock table, check if the user has added it as favorite
  } else if (idQuery.length === 1) {
    let userStockQuery = await knex("user_stock")
      .select("stock_id")
      .where("user_id", decoded.id)
      .where("stock_id", idQuery[0].id);
    console.log(userStockQuery);

    if (userStockQuery.length === 0) {
      return knex("user_stock")
        .insert({ user_id: decoded.id, stock_id: idQuery[0].id })
        .then(() => {
          getStockArray(decoded, res);
        });
    } else {
      getStockArray(decoded, res);
    }
  }
};

// DELETE
exports.deleteFave = async function (req, res) {
  let token = req.headers.authorization.split(" ")[1];
  console.log(token);
  let decoded = jwt.verify(token, config.jwtSecret);
  console.log(decoded);

  // Find the stock's id
  let idQuery = await knex("stocks").select("id").where("symbol", req.params.symbol);
  console.log(idQuery, "Y");

  // Delete the stock in the 'user_stock' table
  if (idQuery.length === 1) {
    return knex("user_stock")
      .where("stock_id", idQuery[0].id)
      .where("user_id", decoded.id)
      .del()
      .then(() => {
        getStockArray(decoded, res);
      });
  } else {
    throw new Error("This stock does not exist in the favorite list.");
  }
};
