// ---------------------------------------------------------------- npm install lightweight-charts ------------------------------

import React from "react";
// import React, { useEffect } from "react";
import { createChart } from "lightweight-charts";
import { Form, Input, FormGroup } from "reactstrap";

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
      index: "NDX",
      interval: "ytd",

      compact: [],
      chart: [],

      ndx: [],
      ccmp: [],
      spx: [],
      soxx: [],
      igv: [],
    };

    this.callAPI = this.callAPI.bind(this);
    this.changeIndex = this.changeIndex.bind(this);
    this.changeInterval = this.changeInterval.bind(this);
  }

  componentDidMount() {
    this.callAPI(this.state.interval, this.state.index);
    this.callIndexAPI();
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
      width: 1000,
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

  async callIndexAPI() {
    const api = `https://bloomberg-market-and-financial-news.p.rapidapi.com/market/get-compact?id=ndx%3Aind%2C%20ccmp%3Aind%2C%20spx%3Aind%2C%20soxx%3Aus%2C%20igv%3Aus`;
    try {
      fetch(api, {
        method: "GET",
        headers: {
          "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
          "x-rapidapi-host": "bloomberg-market-and-financial-news.p.rapidapi.com",
        },
      })
        .then((results) => {
          return results.json();
        })
        .then((data) => {
          // console.log(data[0]["result"][`NDX:IND`]["last"]);
          let compactData1 = data["result"][`NDX:IND`];
          let compactData2 = data["result"][`CCMP:IND`];
          let compactData3 = data["result"][`SPX:IND`];
          let compactData4 = data["result"][`SOXX:US`];
          let compactData5 = data["result"][`IGV:US`];
          this.setState({
            ndx: compactData1,
            ccmp: compactData2,
            spx: compactData3,
            soxx: compactData4,
            igv: compactData5,
          });
        });
    } catch (err) {
      console.log(err);
    }
  }

  async callAPI(interval, index) {
    let chartDiv = document.getElementById("chart");
    chartDiv.innerHTML = "";

    const urls = [
      `https://bloomberg-market-and-financial-news.p.rapidapi.com/market/get-compact?id=${index}%3Aind`,
      `https://bloomberg-market-and-financial-news.p.rapidapi.com/market/get-chart?interval=${interval}&id=${index}%3Aind`,
    ];

    try {
      // console.log(process.env.REACT_APP_RAPIDAPI_KEY);
      let data = await Promise.all(
        urls.map((url) =>
          fetch(url, {
            method: "GET",
            headers: {
              "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
              "x-rapidapi-host": "bloomberg-market-and-financial-news.p.rapidapi.com",
            },
          }).then((res) => res.json()),
        ),
      );
      let compactData = data[0]["result"][`${index.toUpperCase()}:IND`];
      let chartData = data[1]["result"][`${index.toUpperCase()}:IND`]["ticks"];

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

  render() {
    let netChange = this.state.compact["netChange"];
    let changePercent = this.state.compact["pctChange"];
    let ytdChange = this.state.compact["pctChangeYTD"];

    // Colors of the quotes
    var fontStyle = {};
    function changeFontColor(input) {
      if (input > 0) {
        fontStyle = { color: "green" };
      }
      if (input < 0) {
        fontStyle = { color: "red" };
      }
      return fontStyle;
    }

    return (
      <>
        <div className="main-index-container">
          <div className="main-index-box">
            <h6>Nasdaq 100</h6>
            <h2>{this.state.ndx["last"]}</h2>
            <h5>
              <span style={changeFontColor(netChange)}>{this.state.ndx["netChange"]}</span>
            </h5>
            <h5>
              <span style={changeFontColor(changePercent)}>{this.state.ndx["pctChange"] + "%"}</span>
            </h5>
          </div>
          <div className="main-index-box">
            <h6>Nasdaq Composite</h6>
            <h2>{this.state.ccmp["last"]}</h2>
            <h5>
              <span style={changeFontColor(netChange)}>{this.state.ccmp["netChange"]}</span>
            </h5>
            <h5>
              <span style={changeFontColor(changePercent)}>{this.state.ccmp["pctChange"] + "%"}</span>
            </h5>
          </div>
          <div className="main-index-box">
            <h6>S&P 500</h6>
            <h2>{this.state.spx["last"]}</h2>
            <h5>
              <span style={changeFontColor(netChange)}>{this.state.spx["netChange"]}</span>
            </h5>
            <h5>
              <span style={changeFontColor(changePercent)}>{this.state.spx["pctChange"] + "%"}</span>
            </h5>
          </div>
          <div className="main-index-box">
            <h6>iShares PHLX Semiconductor ETF</h6>
            <h2>{this.state.soxx["last"]}</h2>
            <h5>
              <span style={changeFontColor(netChange)}>{this.state.soxx["netChange"]}</span>
            </h5>
            <h5>
              <span style={changeFontColor(changePercent)}>{this.state.soxx["pctChange"] + "%"}</span>
            </h5>
          </div>
          <div className="main-index-box">
            <h6>iShares Expanded Tech-Software Sector ETF</h6>
            <h2>{this.state.igv["last"]}</h2>
            <h5>
              <span style={changeFontColor(netChange)}>{this.state.igv["netChange"]}</span>
            </h5>
            <h5>
              <span style={changeFontColor(changePercent)}>{this.state.igv["pctChange"] + "%"}</span>
            </h5>
          </div>
        </div>
        <div className="dashboard-index">
          <div className="dashboard-index-quote">
            <h5>{`${this.state.compact["name"]}`}</h5>
            <div className="dashboard-flex">
              <div className="dashboard-chart-main">
                <h1>{this.state.compact["last"]}</h1>
                <h5>
                  <span style={changeFontColor(netChange)}>{this.state.compact["netChange"]}</span>
                </h5>
                <h5>
                  <span style={changeFontColor(changePercent)}>{this.state.compact["pctChange"] + "%"}</span>
                </h5>
              </div>
            </div>
            <div className="dashboard-chart-title">
              <div className="dashboard-info">
                <h6>High</h6>
                <h5> {this.state.compact["dayHigh"]}</h5>
              </div>
              <div className="dashboard-info">
                <h6>Low </h6>
                <h5>{this.state.compact["dayLow"]}</h5>
              </div>
              <div className="dashboard-info">
                <h6>Volume(M)</h6>
                <h5> {Math.round(this.state.compact["volume"] / 1000000)}</h5>
              </div>
            </div>
            <div className="dashboard-chart-title">
              <div className="dashboard-info">
                <h6>52-week High</h6>
                <h5> {this.state.compact["yearHigh"]}</h5>
              </div>
              <div className="dashboard-info">
                <h6>52-week Low</h6>
                <h5> {this.state.compact["yearLow"]}</h5>
              </div>
              <div className="dashboard-info">
                <h6>YTD change %</h6>
                <h5>
                  <span style={changeFontColor(ytdChange)}>{this.state.compact["pctChangeYTD"] + "%"}</span>
                </h5>
              </div>
            </div>
            <Form className="dashboard-chart-options">
              <FormGroup>
                <div className="select-index">
                  <h6>Index</h6>
                  <Input type="select" value={this.state.index} onChange={this.changeIndex}>
                    <option value="ndx">NASDAQ 100</option>
                    <option value="ccmp">NASDAQ Composite</option>
                    <option value="spx">S&P 500</option>
                    <option value="indu">Dow Jones Industrial</option>
                    <option value="igv">Russell 2000</option>
                  </Input>
                </div>

                <div className="select-interval">
                  <h6>Interval</h6>
                  <Input type="select" value={this.state.interval} onChange={this.changeInterval}>
                    <option value="m1">1M</option>
                    <option value="m3">3M</option>
                    <option value="m6">6M</option>
                    <option value="ytd">YTD</option>
                    <option value="y1">1Y</option>
                    <option value="y5">5Y</option>
                  </Input>
                </div>
              </FormGroup>
            </Form>
          </div>

          <div className="dashboard-index-chart-container">
            <div className="chart" id="chart" ref={this.ref} />
          </div>
        </div>
      </>
      // <></>
    );
  }
}

// "x-rapidapi-key": "a2ee38ed73mshd61421606491fb7p1a46d1jsnd6ecf75b7c6b"
