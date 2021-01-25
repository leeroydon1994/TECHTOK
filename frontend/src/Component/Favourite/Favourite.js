import React from "react";
// import axios from "axios";
import "./FavouriteStyles.css";
// import Button from '@material-ui/core/Button';

import StockTable from "./FavouriteStockTable";
import StockDescriptionFull from "./StockDescriptionFave";

import { Table } from "reactstrap";

import axios from "axios";
import TagsFilter from "./FavouriteTagsFilter";

export default class Favourite extends React.Component {
  render() {
    return <StockAPI />;
  }
}

export class StockAPI extends React.Component {
  constructor() {
    super();

    this.state = {
      displayList: [],
      filter: [],
    };

    this.tagsArray = ["red", "yellow", "green", "blue"];
    this.user = localStorage.getItem("token");

    // this.getFaveData = this.getFaveData.bind(this);
    this.deleteFaveData = this.deleteFaveData.bind(this);

    this.changeAddTagsStyle = this.changeAddTagsStyle.bind(this);
    this.changeDeleteTagsStyle = this.changeDeleteTagsStyle.bind(this);
    this.filterMoreTag = this.filterMoreTag.bind(this);
    this.filterLessTag = this.filterLessTag.bind(this);

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
        "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
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
        console.log(mappedStockResult, "fav");
        this.setState({
          displayList: mappedStockResult,
        });
        console.log(this.state.displayList);
      })
      .catch((err) => console.log(err));
  }

  /* ----------- */

  // Change the color of the tags
  changeDeleteTagsStyle(symbol, color) {
    let tagsOn = document.getElementsByClassName(`${symbol}-${color}-on`);
    let tagsOff = document.getElementsByClassName(`${symbol}-${color}-off`);

    console.log(tagsOn, tagsOff);
    let displayArray = ["display: initial", "display: none"];

    tagsOn[0].setAttribute("style", displayArray[1]);

    tagsOff[0].setAttribute("style", displayArray[0]);
  }

  changeAddTagsStyle(symbol, color) {
    let tagsOn = document.getElementsByClassName(`${symbol}-${color}-on`);
    let tagsOff = document.getElementsByClassName(`${symbol}-${color}-off`);

    console.log(tagsOn);
    let displayArray = ["display: initial", "display: none"];

    tagsOn[0].setAttribute("style", displayArray[0]);

    tagsOff[0].setAttribute("style", displayArray[1]);
  }

  /* -------------------------------- */

  // Filtering
  // Choosing more tags
  filterMoreTag(color) {
    axios
      .get(`${process.env.REACT_APP_API_SERVER}/api/favourite/stock`, {
        headers: { Authorization: `Bearer ${this.user}` },
      })
      .then((res) => {
        console.log(res.data, "FFFF");
        // Symbol + color
        let stockColorsArray = res.data.map((element) => {
          let obj = { ...element };
          obj["color"] = this.tagsArray[element.tag_id - 1];
          return obj;
        });
        console.log(stockColorsArray, "GGG");

        // Stocks WITHOUT tags of the corresponding color
        let filteredNonColorArray = stockColorsArray.filter((row) => row.color !== color).map((row) => row.symbol);
        console.log(filteredNonColorArray, `FILTERED COLOR =/= ${color}`);
        // Stocks with tags of the corresponding color
        let filteredColorArray = stockColorsArray.filter((row) => row.color === color).map((row) => row.symbol);
        console.log(filteredColorArray, `FILTERED COLOR = ${color}`);

        // Filter out those having multiple tags with the target color
        let targetElements = filteredNonColorArray.filter((value) => !filteredColorArray.includes(value));
        console.log(targetElements);

        //     // Filter the state array
        //     let filteredState = [];
        //     console.log(this.state.displayList);
        for (let element of targetElements) {
          document.getElementById(`${element}-row`).setAttribute("style", "display:none");
        }
        // Change the tag button
        this.changeAddTagsStyle("filter", color);
        // Set state
        this.setState({ filter: [...this.state.filter, color] });
        //     console.log(filteredState);

        //     // Set the new state to change the displaying stock list
        //     this.setState({ displayList: filteredState, filter: [...this.state.filter, color] });
      });
  }

  // Choosing less tags
  filterLessTag(color) {
    console.log(color, this.state.filter.indexOf(color));

    let filter = JSON.parse(JSON.stringify(this.state.filter));
    filter.splice(this.state.filter.indexOf(color), 1);

    console.log(filter, "newFilter");

    axios
      .get(`${process.env.REACT_APP_API_SERVER}/api/favourite/stock`, {
        headers: { Authorization: `Bearer ${this.user}` },
      })
      .then((res) => {
        console.log(res.data, "FFFF");
        // Symbol + color
        let stockColorsArray = res.data.map((element) => {
          let obj = { ...element };
          obj["color"] = this.tagsArray[element.tag_id - 1];
          return obj;
        });
        console.log(stockColorsArray, "GGG");

        let faveSymbolArray = new Set(stockColorsArray.map((row) => row.symbol));
        for (let element of faveSymbolArray) {
          document.getElementById(`${element}-row`).removeAttribute("style");
        }

        for (let color of filter) {
          // Stocks WITHOUT tags of the corresponding color
          let filteredNonColorArray = stockColorsArray.filter((row) => row.color !== color).map((row) => row.symbol);
          console.log(filteredNonColorArray, `FILTERED COLOR =/= ${color}`);
          // Stocks with tags of the corresponding color
          let filteredColorArray = stockColorsArray.filter((row) => row.color === color).map((row) => row.symbol);
          console.log(filteredColorArray, `FILTERED COLOR = ${color}`);

          // Filter out those having multiple tags with the target color
          let targetElements = filteredNonColorArray.filter((value) => !filteredColorArray.includes(value));
          console.log(targetElements);

          for (let element of targetElements) {
            document.getElementById(`${element}-row`).setAttribute("style", "display:none");
          }
        }

        // Change the tag button
        this.changeDeleteTagsStyle("filter", color);

        // Set state
        this.setState({ filter: filter });
      });
  }

  // ------------------------------

  // Interaction with backend
  // Fave stocks
  getFaveData() {
    axios
      .get(`${process.env.REACT_APP_API_SERVER}/api/favourite/stock`, {
        headers: { Authorization: `Bearer ${this.user}` },
      })
      .then((res) => {
        console.log(res.data, "TT");
        if (res.data.length !== 0) {
          let symbolArray = [];
          for (let item of res.data) {
            console.log(item, item.tag_id);
            symbolArray.push(item.symbol);
          }

          let uniqueSymbolArray = [...new Set(symbolArray)];
          console.log(uniqueSymbolArray, "UNIQUE");

          this.callStockAPI(uniqueSymbolArray.toString());
        } else {
          return;
        }
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
        console.log(res.data, "A");
        let resArray = res.data;
        if (resArray.some((row) => row.symbol !== stock["symbol"])) {
          this.setState({
            displayList: this.state.displayList.filter((row) => row.symbol !== stock["symbol"]),
          });
          console.log(this.state.displayList, "B");
          console.log(stock["symbol"] + "is deleted from the favorite list.");
        } else if (resArray.length === 0) {
          // If there is no fave stocks, return an empty array
          this.setState({
            displayList: [],
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { displayList } = this.state;

    return (
      <div className="favourite-wrapper">
        <div className="favourite-container">
          <h1>Faves</h1>
          <div className="tag-bar">
            <span>Filter by Tags</span>
            <TagsFilter addTag={this.filterMoreTag} deleteTag={this.filterLessTag} />
          </div>
        </div>
        <div className="stocks-list">
          <div className="stocks-container">
            <Table striped className="stock-table">
              <thead>{StockDescriptionFull()}</thead>
              <tbody>
                <StockTable
                  type={displayList}
                  delete={this.deleteFaveData}
                  addTag={this.changeAddTagsStyle}
                  deleteTag={this.changeDeleteTagsStyle}
                />
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

// "x-rapidapi-key": "a2ee38ed73mshd61421606491fb7p1a46d1jsnd6ecf75b7c6b"
