import React from "react";
// import axios from "axios";
import "./FavouriteStyles.css";
// import Button from '@material-ui/core/Button';

import StockTable from "./FavouriteStockTable";
import StockDescriptionFull from "../StockTable/StockDescriptionFull";

import axios from "axios";

export default class Favourite extends React.Component {
  render() {
    return <StockAPI />;
  }
}

export class StockAPI extends React.Component {
  constructor() {
    super();

    this.state = {
      faveStocks: [],
    };

    this.user = localStorage.getItem("token");

    this.getFaveData = this.getFaveData.bind(this);
    this.deleteFaveData = this.deleteFaveData.bind(this);

    this.callStockAPI = this.callStockAPI.bind(this);
  }

  componentDidMount() {
    this.getFaveData();
  }

  callStockAPI(input) {
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
        // Unify the "longName" key in each object to "name", in order to fit the syntax of Bloomberg API
        const mappedStockResult = stockResult.map((item) => {
          let obj = { ...item };
          obj["name"] = item["longName"];
          return obj;
        });
        console.log(mappedStockResult);
        this.setState({
          faveStocks: mappedStockResult,
        });
      })
      .catch((err) => console.log(err));
  }

  // Interaction with backend
  getFaveData() {
    axios
      .get(`${process.env.REACT_APP_API_SERVER}/api/favourite/stock`, {
        headers: { Authorization: `Bearer ${this.user}` },
      })
      .then((res) => {
        console.log(res.data.flat(1));
        let symbolArray = [];
        for (let item of res.data.flat(1)) {
          symbolArray.push(item.symbol);
        }
        this.callStockAPI(symbolArray.toString());
      })
      .catch((err) => console.log(err));
  }

  deleteFaveData(stock, id) {
    console.log(stock["symbol"], id);

    axios
      .delete(`${process.env.REACT_APP_API_SERVER}/api/favourite/stock/${stock["symbol"]}`, {
        headers: { Authorization: `Bearer ${this.user}` },
      })
      .then((res) => {
        console.log(res.data.flat(1), "A");
        let resArray = res.data.flat(1);
        if (resArray.some((row) => row.symbol !== stock["symbol"])) {
          this.setState({
            faveStocks: this.state.faveStocks.filter((row) => row.symbol !== stock["symbol"]),
          });
          console.log(this.state.faveStocks, "B");

          // A bug appears when the user deletes the final one fave stocks, because the length of the resArray is 0

          console.log(stock["symbol"] + "is deleted from the favorite list.");

          // let symbolArray = [];
          // for (let item of res.data.flat(1)) {
          //   symbolArray.push(item.symbol);
          // }
          // this.callStockAPI(symbolArray.toString());
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { faveStocks } = this.state;

    return (
      <div className="favourite-wrapper">
        <h1>Faves</h1>
        <div className="stocks-list">
          <div className="stocks-container">
            <table className="stock-table">
              <thead>{StockDescriptionFull()}</thead>
              <tbody>
                <StockTable type={faveStocks} delete={this.deleteFaveData} />
              </tbody>
            </table>
          </div>
        </div>

        <div className="button stock-refresh-button">{/* <Button onClick={this.callStockAPI}>Refresh</Button> */}</div>
      </div>
    );
  }
}

// "x-rapidapi-key": "a2ee38ed73mshd61421606491fb7p1a46d1jsnd6ecf75b7c6b"
