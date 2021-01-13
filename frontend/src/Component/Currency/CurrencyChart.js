// ---------------------------------------------------------------- npm install lightweight-charts ------------------------------

import React from "react";
// import React, { useEffect } from "react";
import { createChart } from "lightweight-charts";

export default function CurrencyChart({ baseCurrency, convertToCurrency }) {
  return (
    <Chart baseCurrency={baseCurrency} convertToCurrency={convertToCurrency} />
  );
}

class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.ref = React.createRef();

    this.state = {
      interval: "ytd",

      compact: [],
      chart: [],
    };

    this.callAPI = this.callAPI.bind(this);
    this.changeInterval = this.changeInterval.bind(this);
    this.toggleFave = this.toggleFave.bind(this);
  }

  componentDidMount() {
    this.callAPI(
      this.state.interval,
      this.props.baseCurrency,
      this.props.convertToCurrency
    );
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.baseCurrency !== prevProps.baseCurrency ||
      this.props.convertToCurrency !== prevProps.convertToCurrency
    ) {
      this.callAPI(
        this.state.interval,
        this.props.baseCurrency,
        this.props.convertToCurrency
      );
    }
  }

  changeInterval(e) {
    this.setState({
      interval: e.target.value,
    });

    this.callAPI(
      e.target.value,
      this.props.baseCurrency,
      this.props.convertToCurrency
    );
  }

  drawChart(data) {
    const chart = createChart(this.ref.current, {
      width: 1300,
      height: 500,
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

  async callAPI(interval, baseCurrency, convertToCurrency) {
    let chartDiv = document.getElementById("chart");
    chartDiv.innerHTML = "";

    const urls = [
      `https://bloomberg-market-and-financial-news.p.rapidapi.com/market/get-compact?id=${baseCurrency}${convertToCurrency}%3Acur`,
      `https://bloomberg-market-and-financial-news.p.rapidapi.com/market/get-chart?interval=${interval}&id=${baseCurrency}${convertToCurrency}%3Acur`,
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
      let compactData =
        data[0]["result"][`${baseCurrency}${convertToCurrency}:cur`];
      let chartData =
        data[1]["result"][`${baseCurrency}${convertToCurrency}:cur`]["ticks"];

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
        <div className="index-quote">
          <div className="chart-main">
            <h1 id="currency-chart-name">{this.state.compact["name"]}</h1>
            <h1>{this.state.compact["last"]}</h1>
            <h2>{this.state.compact["netChange"]}</h2>
            <h2>{this.state.compact["pctChange"] + "%"}</h2>
          </div>
          <div className="right-element">
            <div className="chart-title">
              <div>
                <h2>High: {this.state.compact["dayHigh"]}</h2>
                <h2>Low: {this.state.compact["dayLow"]}</h2>
              </div>
            </div>
            <div className="chart-title">
              <div>
                <h2>52-week High: {this.state.compact["yearHigh"]}</h2>
                <h2>52-week Low: {this.state.compact["yearLow"]}</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="index-chart-container">
          <div className="chart" id="chart" ref={this.ref} />

          <form className="chart-options">
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
