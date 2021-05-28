// Logic:
// 1. onClick function, send data(name, symbol) to the backend by axios
// 2. backend, router => controller, one file per feature
// 3. Query the table, check if the data exists
// 4. Send back the data to controller, then the frontend
// 5. Update the data by axios, render the button

import React from "react";
import { Button } from "@material-ui/core";

import StockInfoFull from "../StockTable/StockInfoFull";
import FavouriteTags from "./FavouriteTags";

import axios from "axios";

export default class FavouriteStockTable extends React.Component {
  constructor(props) {
    super(props);

    this.user = localStorage.getItem("token");

    this.tagsArray = ["red", "yellow", "green", "blue"];

    this.getTagData = this.getTagData.bind(this);
    this.addTagData = this.addTagData.bind(this);
    this.deleteTagData = this.deleteTagData.bind(this);
  }

  // Tags
  getTagData(stock) {
    let symbol = stock.symbol;

    // Share with the fave GET route
    axios
      .get(`${process.env.REACT_APP_API_SERVER}/api/favourite/stock`, {
        headers: { Authorization: `Bearer ${this.user}` },
      })
      .then((res) => {
        for (let color of this.tagsArray) {
          if (
            res.data.some(
              (row) =>
                row.symbol === symbol &&
                row.tag_id === this.tagsArray.indexOf(color) + 1,
            )
          ) {
            this.props.addTag(symbol, color);
          }
        }
      });
  }

  addTagData(stock, color) {
    axios
      .put(
        `${process.env.REACT_APP_API_SERVER}/api/tags/stock/${stock}`,
        { tag: color },
        {
          headers: { Authorization: `Bearer ${this.user}` },
        },
      )
      .then((res) => {
        this.props.addTag(stock, color);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  deleteTagData(stock, color) {
    axios
      .delete(`${process.env.REACT_APP_API_SERVER}/api/tags/stock/${stock}`, {
        data: { tag: color },
        headers: { Authorization: `Bearer ${this.user}` },
      })
      .then((res) => {
        this.props.deleteTag(stock, color);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return this.props.type.map((stock) => (
      <tr
        id={`${stock["symbol"]}-row`}
        className="stock-row"
        key={this.props.type.indexOf(stock)}
        onChange={this.getTagData(stock)}
      >
        <StockInfoFull stock={stock} />

        <td>
          <Button
            variant="contained"
            color="default"
            id={`${stock["symbol"]}-${this.props.type.indexOf(stock)}-delete`}
            onClick={() => this.props.delete(stock)}
            className={`${stock["symbol"]}-delete`}
            style={{ display: "initial" }}
          >
            DELETE
          </Button>
        </td>

        <FavouriteTags
          stockName={stock["symbol"]}
          addTag={this.addTagData}
          deleteTag={this.deleteTagData}
        />
      </tr>
    ));
  }
}
