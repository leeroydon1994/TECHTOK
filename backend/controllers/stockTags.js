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
  console.log("GET");

  // Find the stocks' ids and tags registered with a particular user
  let stockIds = await knex("user_stock").select("stock_id", "tag_id").where("user_id", decoded.id);
  console.log(stockIds, "P");

  // Convert the ids into symbols
  for (let stockId of stockIds) {
    let symbol = await knex("stocks").select("symbol").where("stocks.id", stockId.stock_id).returning("symbol");
    console.log(symbol, "SINGLE SYMBOL");
    stockArray.push(symbol);
  }

  // Send the symbols back to frontend
  console.log(stockArray, "Q");
  let symbolsTagsArray = stockArray.map((element, i) => {
    console.log(element, "SYMBOL (FAVE)");
    console.log(stockIds[i]["tag_id"]);
    return { ...element[0], tag_id: stockIds[i]["tag_id"] };
  });
  console.log(symbolsTagsArray, "QD");
  res.send(symbolsTagsArray);
}

// PUT(TAGS) => For the column WITHOUT
exports.putTag = async function (req, res) {
  let token = req.headers.authorization.split(" ")[1];
  console.log(token, "TOKEN PUT");

  let decodedObject = jwt.verify(token, config.jwtSecret);
  // Deep clone the decoded object
  let deepClone = JSON.parse(JSON.stringify(decodedObject));
  // Convert decoded user name into user id
  let tableUserId = await knex("users").select("id").where("name", deepClone.name);
  let decoded = Object.assign(deepClone, { id: tableUserId[0].id });
  console.log(decoded, "DECODED");

  let { tag } = req.body;
  let symbol = req.params.symbol;
  console.log("PUT", symbol, tag);

  // Check if the stock id exists by seraching its symbol
  let idQuery = await knex("stocks").select("id").where("symbol", symbol);
  // Check if the tag id exists by seraching its tag
  let tagQuery = await knex("tags").select("id").where("tags.name", tag);
  // Then check if null stock id exists in the fave table of that user
  let nullFaveQuery = await knex("user_stock")
    .select("id")
    .where("user_id", decoded.id)
    .where("stock_id", idQuery[0].id)
    .where("tag_id", null);
  console.log(idQuery, "id", tagQuery, "tag", nullFaveQuery, "fave");

  // If there is a row with tag_id being null, update the column
  if (nullFaveQuery.length === 1) {
    console.log("PUT => PUT");
    return knex("user_stock")
      .where("user_id", decoded.id)
      .where("user_stock.id", nullFaveQuery[0].id)
      .update({ tag_id: tagQuery[0].id })
      .then(() => {
        getStockArray(decoded, res);
      });
  } else if (nullFaveQuery.length === 0) {
    // If the tag_id exists, check if the SAME tag_id exists
    let sameTagIdFaveQuery = await knex("user_stock")
      .select("id")
      .where("user_id", decoded.id)
      .where("stock_id", idQuery[0].id)
      .where("tag_id", tagQuery[0].id);
    console.log(sameTagIdFaveQuery);
    if (sameTagIdFaveQuery.length === 0) {
      // IF the tag_ids are not the same, add a new row
      console.log("PUT => POST");
      return knex("user_stock")
        .insert({ user_id: decoded.id, stock_id: idQuery[0].id, tag_id: tagQuery[0].id })
        .returning("id")
        .then((data) => {
          console.log(data, "PPP");
          getStockArray(decoded, res);
        });
    } else {
      getStockArray(decoded, res);
    }
  } else {
    getStockArray(decoded, res);
  }
};

// DELETE(TAG)
exports.deleteTag = async function (req, res) {
  let token = req.headers.authorization.split(" ")[1];
  console.log(token, "TOKEN PUT");

  let decodedObject = jwt.verify(token, config.jwtSecret);
  // Deep clone the decoded object
  let deepClone = JSON.parse(JSON.stringify(decodedObject));
  // Convert decoded user name into user id
  let tableUserId = await knex("users").select("id").where("name", deepClone.name);
  let decoded = Object.assign(deepClone, { id: tableUserId[0].id });
  console.log(decoded, "DECODED");

  let { tag } = req.body;
  let symbol = req.params.symbol;
  console.log("DELETE", symbol, tag);

  // Check if the stock id exists by seraching its symbol
  let idQuery = await knex("stocks").select("id").where("symbol", symbol);
  // Check if the tag id exists by seraching its tag
  let tagQuery = await knex("tags").select("id").where("tags.name", tag);
  // Then check if the stock id exists in the fave table of that user
  let sameTagIdFaveQuery = await knex("user_stock")
    .select("id")
    .where("user_id", decoded.id)
    .where("stock_id", idQuery[0].id)
    .where("tag_id", tagQuery[0].id);
  console.log(idQuery, "id", tagQuery, "tag", sameTagIdFaveQuery, "fave");

  // Check if the stock has multiple tags
  let multipleTagsQuery = await knex("user_stock").where("stock_id", idQuery[0].id).where("user_id", decoded.id);
  console.log(multipleTagsQuery, "MULTI");

  if (sameTagIdFaveQuery.length === 1 && multipleTagsQuery.length > 1) {
    // If it exists, delete the row
    console.log("DELETE TAG");
    return knex("user_stock")
      .where("user_id", decoded.id)
      .where("stock_id", idQuery[0].id)
      .where("tag_id", tagQuery[0].id)
      .del()
      .then(() => {
        getStockArray(decoded, res);
      });
  } else if (sameTagIdFaveQuery.length === 1 && multipleTagsQuery.length === 1) {
    console.log("EMPTY THE TAG!");
    return knex("user_stock")
      .where("user_id", decoded.id)
      .where("stock_id", idQuery[0].id)
      .update({ tag_id: null })
      .then(() => {
        getStockArray(decoded, res);
      });
  } else {
    getStockArray(decoded, res);
  }
};
