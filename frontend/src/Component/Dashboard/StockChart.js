// ---------------------------------------------------------------- npm install lightweight-charts ------------------------------

import React from "react";
// import React, { useEffect } from "react";
import { createChart } from "lightweight-charts";

export default class StockChart extends React.Component {
  render() {
    return <Chart />;
  }
}

class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.ref = React.createRef();

    this.state = {
      index: "ndx",
      interval: "ytd",

      compact: [],
      chart: [],
    };

    this.callAPI = this.callAPI.bind(this);
    this.changeIndex = this.changeIndex.bind(this);
    this.changeInterval = this.changeInterval.bind(this);
    this.toggleFave = this.toggleFave.bind(this);
  }

  componentDidMount() {
    this.callAPI(this.state.interval, this.state.index);
  }

  changeInterval(e) {
    this.setState({
      interval: e.target.value,
    });
    console.log(e.target.value, this.state.interval, this.state.index);

    this.callAPI(e.target.value, this.state.index);
  }

  changeIndex(e) {
    this.setState({
      index: e.target.value,
    });
    console.log(e.target.value, this.state.interval, this.state.index);
    this.callAPI(this.state.interval, e.target.value);
  }

  drawChart(data) {
    const chart = createChart(this.ref.current, {
      width: 1300,
      height: 700,
      layout: {
        backgroundColor: "#000000",
        textColor: "#d1d4dc",
      },
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          color: "rgba(42, 46, 57, 0.5)",
        },
      },
      rightPriceScale: {
        borderVisible: false,
      },
      timeScale: {
        borderVisible: false,
      },
      crosshair: {
        horzLine: {
          visible: true,
        },
      },
      localization: {
        locale: "en-US",
      },
      priceScale: {
        mode: 1,
        autoScale: true,
        invertScale: false,
        alignLabels: true,
        borderVisible: false,
        borderColor: "#555ffd",
        scaleMargins: {
          top: 0.3,
          bottom: 0.25,
        },
      },
      handleScroll: {
        mouseWheel: false,
        pressedMouseMove: false,
      },
    });
    const lineSeries = chart.addAreaSeries();
    lineSeries.setData(data);
    chart.timeScale().fitContent();
  }

  async callAPI(interval, index) {
    let chartDiv = document.getElementById("chart");
    chartDiv.innerHTML = "";

    const urls = [
      `https://bloomberg-market-and-financial-news.p.rapidapi.com/market/get-compact?id=${index}%3Aind`,
      `https://bloomberg-market-and-financial-news.p.rapidapi.com/market/get-chart?interval=${interval}&id=${index}%3Aind`,
    ];

    try {
      let data = await Promise.all(
        urls.map((url) =>
          fetch(url, {
            method: "GET",
            headers: {
              "x-rapidapi-key":
                "a2ee38ed73mshd61421606491fb7p1a46d1jsnd6ecf75b7c6b",
              "x-rapidapi-host":
                "bloomberg-market-and-financial-news.p.rapidapi.com",
            },
          }).then((res) => res.json())
        )
      );
      let compactData = data[0]["result"][`${index}:ind`];
      let chartData = data[1]["result"][`${index}:ind`]["ticks"];

      console.log("Compact:" + compactData + "\nChart:" + chartData);

      // Deep clone
      let realChartData = chartData.map((tick) => {
        let ticker = {};
        ticker["time"] = tick["time"];
        ticker["value"] = tick["close"];
        return ticker;
      });

      this.setState({
        compact: compactData,
        chart: realChartData,
      });

      this.drawChart(realChartData);
    } catch (err) {
      console.log(err);
    }
  }

  toggleFave(id) {}

  render() {
    return (
      <>
        <div className="dashboard-index-quote">
          <div className="dashboard-chart-main">
            <h2>Name: {this.state.compact["name"]}</h2>
            <h2>Last: {this.state.compact["last"]}</h2>
            <h2>Netchange: {this.state.compact["netChange"]}</h2>
            <h2>Change %: {this.state.compact["pctChange"] + "%"}</h2>
          </div>
          <div className="dashboard-chart-title1">
            <h3>High: {this.state.compact["dayHigh"]}</h3>
            <h3>Low: {this.state.compact["dayLow"]}</h3>
            <h3>Volume(K): {this.state.compact["volume"]}</h3>
          </div>
          <div className="dashboard-chart-title2">
            <h3>52-week High: {this.state.compact["yearHigh"]}</h3>
            <h3>52-week Low: {this.state.compact["yearLow"]}</h3>
            <h3>YTD change %: {this.state.compact["pctChangeYTD"]}</h3>
          </div>
        </div>

        <div className="dashboard-index-chart-container">
          <div className="chart" id="chart" ref={this.ref} />

          <form className="dashboard-chart-options">
            <div className="select-index">
              <h3>Index</h3>
              <select value={this.state.index} onChange={this.changeIndex}>
                <option value="ndx">NASDAQ 100</option>
                <option value="ccmp">NASDAQ Composite</option>
                <option value="spx">S&P 500</option>
                <option value="indu">Dow Jones Industrial</option>
                <option value="rty">Russell 2000</option>
              </select>
            </div>

            <div className="select-interval">
              <h3>Interval</h3>
              <select
                value={this.state.interval}
                onChange={this.changeInterval}
              >
                <option value="m1">1M</option>
                <option value="m3">3M</option>
                <option value="m6">6M</option>
                <option value="ytd">YTD</option>
                <option value="y1">1Y</option>
                <option value="y5">5Y</option>
              </select>
            </div>
          </form>
        </div>
      </>
      // <></>
    );
  }
}

// "x-rapidapi-key": "a2ee38ed73mshd61421606491fb7p1a46d1jsnd6ecf75b7c6b"
