import React from "react";
// import axios from "axios";
import "./RatingsStyles.css";
// import Button from '@material-ui/core/Button';

import StockTable from "./RatingsStockTable";
import StockDescriptionFull from "../StockTable/StockDescriptionFull";
import { Table } from "reactstrap";
import axios from "axios";

export default class Ratings extends React.Component {
  render() {
    return <StockAPI />;
  }
}

export class StockAPI extends React.Component {
  constructor() {
    super();

    this.state = {
      stockRatings: [],
    };

    this.user = localStorage.getItem("token");

    this.deleteFaveData = this.deleteFaveData.bind(this);
    this.getFaveData = this.getFaveData.bind(this);
    this.addFaveData = this.addFaveData.bind(this);
    this.callStockAPI = this.callStockAPI.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  callStockAPI(input) {
    console.log(input);
    let api = `https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${input}`;

    fetch(api, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "a2ee38ed73mshd61421606491fb7p1a46d1jsnd6ecf75b7c6b",
        "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((stockResult) => {
        console.log(stockResult);
        // Unify the "longName" key in each object to "name", in order to fit the syntax of Bloomberg API
        const mappedStockResult = stockResult.map((item) => {
          let obj = { ...item };
          obj["name"] = item["longName"];
          return obj;
        });
        console.log(mappedStockResult);
        this.setState({
          stockRatings: mappedStockResult,
        });
      })
      .catch((err) => console.log(err));
  }

  // Change the color of the button
  changeDeleteButtonStyle(symbol) {
    // let buttonAdd = document.getElementById(`${symbol}-${id}-${type}-add`);
    // let buttonDelete = document.getElementById(`${symbol}-${id}-${type}-delete`);
    let buttonAdd = document.getElementsByClassName(`${symbol}-add`);
    let buttonDelete = document.getElementsByClassName(`${symbol}-delete`);

    console.log(buttonAdd);
    let displayArray = ["display: initial", "display: none"];

    for (let i = 0; i < buttonAdd.length; i++) {
      buttonAdd[i].setAttribute("style", displayArray[1]);
    }
    for (let i = 0; i < buttonDelete.length; i++) {
      buttonDelete[i].setAttribute("style", displayArray[0]);
    }
  }

  changeAddButtonStyle(symbol) {
    let buttonAdd = document.getElementsByClassName(`${symbol}-add`);
    let buttonDelete = document.getElementsByClassName(`${symbol}-delete`);

    console.log(buttonAdd);
    let displayArray = ["display: initial", "display: none"];

    for (let i = 0; i < buttonAdd.length; i++) {
      buttonAdd[i].setAttribute("style", displayArray[0]);
    }
    for (let i = 0; i < buttonDelete.length; i++) {
      buttonDelete[i].setAttribute("style", displayArray[1]);
    }
  }

  // Rankings
  getData() {
    axios
      .get(`${process.env.REACT_APP_API_SERVER}/api/ratings/stock`, {
        headers: { Authorization: `Bearer ${this.user}` },
      })
      .then((res) => {
        console.log(res.data.flat(1));

        // Push all symbols into a single array
        let symbolArray = [];
        let symbolCountObj = {};
        for (let item of res.data.flat(1)) {
          symbolArray.push(item.symbol);
        }
        // Count the symbols, then sort them
        symbolArray.forEach(function (symbol) {
          symbolCountObj[symbol] = (symbolCountObj[symbol] || 0) + 1;
        });

        console.log(symbolCountObj);
        let sortedSymbolArray = Object.entries(symbolCountObj).sort(
          (a, b) => b[1] - a[1]
        );
        console.log(sortedSymbolArray);

        let ratingsSymbol = sortedSymbolArray
          .map((item) => item[0])
          .slice(0, 20);
        console.log(ratingsSymbol.toString());

        this.callStockAPI(ratingsSymbol.toString());
      })
      .catch((err) => console.log(err));
  }

  // Fave
  getFaveData(stock) {
    console.log(this.user);
    axios
      .get(`${process.env.REACT_APP_API_SERVER}/api/stock/`, {
        headers: { Authorization: `Bearer ${this.user}` },
      })
      .then((res) => {
        console.log(stock["symbol"]);
        console.log(res.data);

        if (res.data.some((row) => row[0].symbol === stock["symbol"])) {
          console.log("Change button for " + stock["symbol"] + "!");
          this.changeDeleteButtonStyle(stock["symbol"]);
          // this.addedFavoriteBoolean(stock["symbol"]);
        } else {
          console.log("Not to change the button for " + stock["symbol"] + "!");
          // this.beforeFavoriteBoolean(stock["symbol"]);
        }
      })
      .catch((err) => console.log(err));
  }

  addFaveData(stock) {
    console.log(stock["name"], stock["symbol"]);

    axios
      .post(
        `${process.env.REACT_APP_API_SERVER}/api/stock/`,
        {
          company: stock["name"],
          symbol: stock["symbol"],
        },
        {
          headers: { Authorization: `Bearer ${this.user}` },
        }
      )
      .then((res) => {
        console.log(res.data);

        if (res.data.some((row) => row[0].symbol === stock["symbol"])) {
          this.changeDeleteButtonStyle(stock["symbol"]);
          console.log(stock["symbol"] + "is added to the favorite list.");
          // this.addedFavoriteBoolean(stock["symbol"]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteFaveData(stock) {
    console.log(stock["name"], stock["symbol"]);

    axios
      .delete(
        `${process.env.REACT_APP_API_SERVER}/api/stock/${stock["symbol"]}`,
        {
          headers: { Authorization: `Bearer ${this.user}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.some((row) => row[0].symbol !== stock["symbol"])) {
          this.changeAddButtonStyle(stock["symbol"]);
          // this.beforeFavoriteBoolean(stock["symbol"]);
          console.log(stock["symbol"] + "is deleted from the favorite list.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { stockRatings } = this.state;

    return (
      <div className="ratings-wrapper">
        <h1 className="ratings-headline12">Top 20 Stocks</h1>
        <div className="top-20-list">
          <div className="ratings-list-stocks-list1">
            <div className="ratings-container stocks-container">
              <Table className="ratings-table stock-table">
                <thead>{StockDescriptionFull()}</thead>
                <tbody>
                  <StockTable
                    type={stockRatings}
                    add={this.addFaveData}
                    delete={this.deleteFaveData}
                    getFave={this.getFaveData}
                  />
                </tbody>
              </Table>
            </div>
          </div>

          <div className="button stock-refresh-button">
            {/* <Button onClick={this.callStockAPI}>Refresh</Button> */}
          </div>
        </div>
      </div>
    );
  }
}

// "x-rapidapi-key": "a2ee38ed73mshd61421606491fb7p1a46d1jsnd6ecf75b7c6b"
