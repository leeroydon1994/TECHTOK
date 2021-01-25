import React from "react";
import changeFontColor from "../QuoteColor";

export default function StockInfoShort(props) {
  return (
    <>
      <td className="stock-info">{props.stock["symbol"]}</td>
      <td className="stock-info">{props.stock["last"]}</td>
      <td className="stock-info" style={changeFontColor(props.stock["netChange"])}>
        {props.stock["netChange"]}
      </td>
      <td className="stock-info" style={changeFontColor(props.stock["pctChange"])}>
        {props.stock["pctChange"] + "%"}
      </td>
    </>
  );
}
