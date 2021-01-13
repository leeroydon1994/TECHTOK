import React from "react";

export default function StockInfoShort(props) {
  return (
    <>
      <td className="stock-info">{props.stock["symbol"]}</td>
      <td className="stock-info">{props.stock["last"]}</td>
      <td className="stock-info">{props.stock["netChange"]}</td>
      <td className="stock-info">{props.stock["pctChange"] + "%"}</td>
    </>
  );
}
