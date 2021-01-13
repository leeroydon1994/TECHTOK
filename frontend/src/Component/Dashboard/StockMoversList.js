import React from "react";
import { Table } from "reactstrap";

import StockTableShort from "../StockTable/StockTable";
import StockDescriptionShort from "../StockTable/StockDescriptionShort";

export default class StockAPI extends React.Component {
  constructor() {
    super();

    this.state = {
      faved: false,

      activeStocks: [],
      laggardStocks: [],
      leaderStocks: [],
    };

    this.callStockAPI = this.callStockAPI.bind(this);
  }

  componentDidMount() {
    this.callStockAPI();
  }

  callStockAPI() {
    const api =
      "https://bloomberg-market-and-financial-news.p.rapidapi.com/market/get-movers?id=ndx%3Aind";

    fetch(api, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "c5229bbaa3msha0459ecc4c76fddp1e4f7cjsncfff12e01a59",
        "x-rapidapi-host": "bloomberg-market-and-financial-news.p.rapidapi.com",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({
          activeStocks: data["active"],
          laggardStocks: data["laggards"],
          leaderStocks: data["leaders"],
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    // const

    const { activeStocks, laggardStocks, leaderStocks } = this.state;

    return (
      <>
        <div className="dashboard-active-stocks">
          <div className="dashboard-stocks-container">
            <h2>Movers</h2>
            <Table striped className="stock-table">
              <thead>{StockDescriptionShort()}</thead>
              <tbody>
                <StockTableShort
                  api={this.callStockAPI}
                  group="active"
                  type={activeStocks}
                />
              </tbody>
            </Table>
          </div>
        </div>
        <div className="dashboard-laggard-stocks">
          <div className="dashboard-stocks-container">
            <h2>Laggards</h2>
            <Table striped className="stock-table">
              <thead>{StockDescriptionShort()}</thead>
              <tbody>
                <StockTableShort
                  api={this.callStockAPI}
                  full={false}
                  group="laggard"
                  type={laggardStocks}
                />
              </tbody>
            </Table>
          </div>
        </div>
        <div className="dashboard-leader-stocks">
          <div className="dashboard-stocks-container">
            <h2>Leaders</h2>
            <Table striped className="stock-table">
              <thead>{StockDescriptionShort()}</thead>
              <tbody>
                <StockTableShort
                  api={this.callStockAPI}
                  group="leader"
                  type={leaderStocks}
                />
              </tbody>
            </Table>
          </div>
        </div>

        <div className="button stock-refresh-button">
          {/* <Button onClick={this.callStockAPI}>Refresh</Button> */}
        </div>
      </>
    );
  }
}

// "x-rapidapi-key": "a2ee38ed73mshd61421606491fb7p1a46d1jsnd6ecf75b7c6b"
