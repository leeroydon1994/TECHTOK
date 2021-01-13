import React from "react";
import "./CurrencyStyles.css";

import CurrencyChart from "./CurrencyChart.js";

export default class Currency extends React.Component {
  render() {
    return <CurrencyConverter />;
  }
}

class CurrencyConverter extends React.Component {
  constructor() {
    super();

    this.state = {
      baseCurrency: "GBP",
      convertToCurrency: "USD",
      baseAmount: 100,
      rates: [],
      currencies: [],
    };

    this.changeBaseCurrency = this.changeBaseCurrency.bind(this);
    this.changeConvertToCurrency = this.changeConvertToCurrency.bind(this);
    this.changeBaseAmount = this.changeBaseAmount.bind(this);
    this.getConvertedCurrency = this.getConvertedCurrency.bind(this);
    this.callAPI = this.callAPI.bind(this);
  }

  componentDidMount() {
    this.callAPI(this.state.baseCurrency);
  }

  changeBaseCurrency(e) {
    this.setState({ baseCurrency: e.target.value });
    this.callAPI(e.target.value);
  }

  callAPI(base) {
    const api = `https://api.exchangeratesapi.io/latest?base=${base}`;

    fetch(api)
      .then((results) => {
        console.log(results);
        return results.json();
      })
      .then((data) =>
        this.setState({
          rates: data["rates"],
          currencies: Object.keys(data["rates"]).sort(),
        })
      );
  }

  changeConvertToCurrency(e) {
    this.setState({
      convertToCurrency: e.target.value,
    });
  }

  changeBaseAmount(e) {
    this.setState({
      baseAmount: e.target.value,
    });
  }

  getConvertedCurrency(baseAmount, convertToCurrency, rates) {
    return Number.parseFloat(baseAmount * rates[convertToCurrency]).toFixed(3);
  }

  // Consider render() first
  render() {
    const {
      currencies,
      rates,
      baseCurrency,
      baseAmount,
      convertToCurrency,
    } = this.state;

    const currencyChoice = currencies.map((currency) => (
      <option key={currency} value={currency}>
        {" "}
        {currency}{" "}
      </option>
    ));

    const result = this.getConvertedCurrency(
      baseAmount,
      convertToCurrency,
      rates
    );

    return (
      <div className="currency-wrapper">
        <h1> Realtime Currency Convertor</h1>

        <CurrencyChart
          baseCurrency={baseCurrency}
          convertToCurrency={convertToCurrency}
        />

        <div className="main ui text container">
          <div className="form-container">
            <form className="ui mini form">
              <h3>Convert from: {baseCurrency}</h3>
              <select value={baseCurrency} onChange={this.changeBaseCurrency}>
                {currencyChoice}
              </select>

              <h3>Convert to: {convertToCurrency}</h3>
              <select
                value={convertToCurrency}
                onChange={this.changeConvertToCurrency}
              >
                {currencyChoice}
              </select>

              <h3>Amount:</h3>
              <input
                type="number"
                id="base-amount"
                defaultValue={baseAmount}
                onChange={this.changeBaseAmount}
              ></input>
            </form>
            <h2 id="result-text">
              {baseAmount} {baseCurrency} = {result} {convertToCurrency}
            </h2>
          </div>
        </div>
      </div>
    );
  }
}
