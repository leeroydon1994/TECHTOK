import React from "react";

export default function stockDescription() {
  return (
    <thead>
      <tr className="stock-row">
        <th className="stock-info-head ">Symbol</th>
        <th className="stock-info-head ">Last</th>
        <th className="stock-info-head ">Change</th>
        <th className="stock-info-head ">Change %</th>
        <th className="stock-info-head ">Fave</th>
      </tr>
    </thead>
  );
}
