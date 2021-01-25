import React from "react";
import changeFontColor from "../QuoteColor";

export default function StockTableNasdaq100(props) {
  return (
    <>
      <td className="Nasdaq100-stock-info">{props.stock["name"]}</td>
      <td className="Nasdaq100-stock-info">{props.stock["symbol"]}</td>
      <td className="Nasdaq100-stock-info">{props.stock["regularMarketPrice"].toFixed(2)}</td>
      <td className="Nasdaq100-stock-info" style={changeFontColor(props.stock["regularMarketChange"])}>
        {props.stock["regularMarketChange"].toFixed(2)}
      </td>
      <td className="Nasdaq100-stock-info" style={changeFontColor(props.stock["regularMarketChangePercent"])}>
        {props.stock["regularMarketChangePercent"].toFixed(2) + "%"}
      </td>
      <td className="Nasdaq100-stock-info">{Math.floor(props.stock["regularMarketVolume"] / 1000)}</td>
      <td className="Nasdaq100-stock-info">{props.stock["regularMarketDayHigh"].toFixed(2)}</td>
      <td className="Nasdaq100-stock-info">{props.stock["regularMarketDayLow"].toFixed(2)}</td>
      <td className="Nasdaq100-stock-info">{props.stock["fiftyTwoWeekHigh"].toFixed(2)}</td>
      <td className="Nasdaq100-stock-info">{props.stock["fiftyTwoWeekLow"].toFixed(2)}</td>
      <td className="Nasdaq100-stock-info" style={changeFontColor(props.stock["fiftyTwoWeekLowChangePercent"])}>
        {(props.stock["fiftyTwoWeekLowChangePercent"] * 100).toFixed(2) + "%"}
      </td>
    </>
  );
}
