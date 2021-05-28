const express = require("express");
const jwt = require("jsonwebtoken"); // JWT

const cors = require("cors"); // CORS - Cross Origin Resource Sharing
const bodyParser = require("body-parser");
const config = require("../config");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const knexFile = require("../knexfile")[process.env.NODE_ENV || "development"];
const knex = require("knex")(knexFile);

// For all methods, return the stock array back to frontend
async function getStockArray(decoded, res) {
  let stockArray = [];

  // Find the stocks' ids and tags registered with a particular user
  let stockIds = await knex("user_stock")
    .select("stock_id", "tag_id")
    .where("user_id", decoded.id);

  // Convert the ids into symbols
  for (let stockId of stockIds) {
    let symbol = await knex("stocks")
      .select("symbol")
      .where("stocks.id", stockId.stock_id)
      .returning("symbol");
    stockArray.push(symbol);
  }

  // Send the symbols back to frontend
  let symbolsTagsArray = stockArray.map((element, i) => {
    return { ...element[0], tag_id: stockIds[i]["tag_id"] };
  });
  res.send(symbolsTagsArray);
}

//GET (FAVE+TAGS)
exports.getFave = async function (req, res) {
  let token = req.headers.authorization.split(" ")[1];

  let decodedObject = jwt.verify(token, config.jwtSecret);
  // Deep clone the decoded object
  let deepClone = JSON.parse(JSON.stringify(decodedObject));
  // Convert decoded user name into user id
  let tableUserId = await knex("users")
    .select("id")
    .where("name", deepClone.name);
  let decoded = Object.assign(deepClone, { id: tableUserId[0].id });

  getStockArray(decoded, res);
};

// POST
exports.postFave = async function (req, res) {
  let token = req.headers.authorization.split(" ")[1];

  let decodedObject = jwt.verify(token, config.jwtSecret);
  // Deep clone the decoded object
  let deepClone = JSON.parse(JSON.stringify(decodedObject));
  // Convert decoded user name into user id
  let tableUserId = await knex("users")
    .select("id")
    .where("name", deepClone.name);
  let decoded = Object.assign(deepClone, { id: tableUserId[0].id });

  let { company, symbol } = req.body;

  // Check if the stock id exists by seraching its symbol
  let idQuery = await knex("stocks").select("id").where("symbol", symbol);
  // If no results are found, insert the stock data
  if (idQuery.length === 0) {
    return knex("stocks")
      .insert({ company: company, symbol: symbol })
      .returning("id")
      .then((data) => {
        return knex("user_stock")
          .insert({ user_id: decoded.id, stock_id: data[0] })
          .returning("id");
      })
      .then((data) => {
        getStockArray(decoded, res);
      })
      .catch((err) => console.error(err));
    //If the stock is in the stock table, check if the user has added it as favorite
  } else if (idQuery.length === 1) {
    let userStockQuery = await knex("user_stock")
      .select("stock_id")
      .where("user_id", decoded.id)
      .where("stock_id", idQuery[0].id);

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

  let decodedObject = jwt.verify(token, config.jwtSecret);
  // Deep clone the decoded object
  let deepClone = JSON.parse(JSON.stringify(decodedObject));
  // Convert decoded user name into user id
  let tableUserId = await knex("users")
    .select("id")
    .where("name", deepClone.name);
  let decoded = Object.assign(deepClone, { id: tableUserId[0].id });

  // Find the stock's id
  let idQuery = await knex("stocks")
    .select("id")
    .where("symbol", req.params.symbol);

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
