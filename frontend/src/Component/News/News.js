import React from "react";
import "./NewsPage.css";

const Entities = require("html-entities").AllHtmlEntities;
const entities = new Entities();

export default class News extends React.Component {
  render() {
    return <NewsAPI />;
  }
}

class NewsAPI extends React.Component {
  constructor() {
    super();

    this.state = {
      ticker: "",
      news: [],
    };

    this.handleTickerChange = this.handleTickerChange.bind(this);
    this.callNewsAPI = this.callNewsAPI.bind(this);
  }

  handleTickerChange(e) {
    this.setState({ ticker: e.target.value });
    this.callNewsAPI(e.target.value);
  }

  callNewsAPI(endpoint) {
    const api = `https://yahoo-finance-low-latency.p.rapidapi.com/v2/finance/news?symbols=${endpoint}`;

    fetch(api, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "a2ee38ed73mshd61421606491fb7p1a46d1jsnd6ecf75b7c6b",
        "x-rapidapi-host": "yahoo-finance-low-latency.p.rapidapi.com",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);

        this.setState({
          news: data["Content"]["result"],
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { ticker, news } = this.state;

    const dateOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const newsList = news.map((newsPiece) => (
      <a
        href={newsPiece["url"]}
        key={newsPiece["rank"]}
        style={{ textDecoration: "none" }}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="news-box">
          <div className="news-thumbnail">
            <img
              className="news-thumbnail-image"
              src={newsPiece["thumbnail"]}
              alt=""
            />
          </div>
          <div className="news-text-box">
            <div className="news-text">
              <h1 className="news-title">
                {entities.decode(newsPiece["title"])}
              </h1>
              <h2 className="news-provider">
                {entities.decode(newsPiece["provider_name"])}
              </h2>
              <p className="news-summary">
                {entities.decode(newsPiece["summary"])}
              </p>
            </div>
            <div className="published-time">
              <p>
                {new Date(
                  newsPiece["provider_publish_time"] * 1000
                ).toLocaleDateString("en-US", dateOptions)}
              </p>
            </div>
          </div>
        </div>
      </a>
    ));

    return (
      <div className="news-wrapper">
        <div className="news-searchbar">
          <form className="news-searchbar-form">
            <input
              type="text"
              value={ticker}
              placeholder="Please enter stock tickers. 10 tickers max."
              onChange={this.handleTickerChange}
            />
          </form>
        </div>
        <div className="news-results-container">
          <h1 className="news-title1">Results for {ticker.toUpperCase()}</h1>
          <div className="news-list">{newsList}</div>
        </div>
      </div>
    );
  }
}
