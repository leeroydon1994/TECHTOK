import React from "react";

export default function StockTableNasdaq100(props) {
  return (
    <>
      <td className="Nasdaq100-stock-info">{props.stock["name"]}</td>
      <td className="Nasdaq100-stock-info">{props.stock["symbol"]}</td>
      <td className="Nasdaq100-stock-info">
        {props.stock["regularMarketPrice"].toFixed(2)}
      </td>
      <td className="Nasdaq100-stock-info">
        {props.stock["regularMarketChange"].toFixed(2)}
      </td>
      <td className="Nasdaq100-stock-info">
        {props.stock["regularMarketChangePercent"].toFixed(2) + "%"}
      </td>
      <td className="Nasdaq100-stock-info">
        {Math.floor(props.stock["regularMarketVolume"] / 1000)}
      </td>
      <td className="Nasdaq100-stock-info">
        {props.stock["regularMarketDayHigh"]}
      </td>
      <td className="Nasdaq100-stock-info">
        {props.stock["regularMarketDayLow"]}
      </td>
      <td className="Nasdaq100-stock-info">
        {props.stock["fiftyTwoWeekHigh"]}
      </td>
      <td className="Nasdaq100-stock-info">{props.stock["fiftyTwoWeekLow"]}</td>
      <td className="Nasdaq100-stock-info">
        {(props.stock["fiftyTwoWeekLowChangePercent"] * 100).toFixed(2) + "%"}
      </td>
    </>
  );
}
