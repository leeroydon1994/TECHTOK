import React from "react";

export default function stockDescriptionNasdaq100() {
  return (
    <tr className="stock-row">
      <th className="stock-info head head1">Name</th>
      <th className="stock-info head ">Symbol</th>
      <th className="stock-info head ">Last</th>
      <th className="stock-info head ">Change</th>
      <th className="stock-info head ">Change%</th>
      <th className="stock-info head ">Volume(K)</th>
      <th className="stock-info head ">High</th>
      <th className="stock-info head ">Low</th>
      <th className="stock-info head ">52-week High</th>
      <th className="stock-info head ">52-week Low</th>
      <th className="stock-info head ">YTD Change %</th>
      <th className="stock-info head ">Fave</th>
    </tr>
  );
}
