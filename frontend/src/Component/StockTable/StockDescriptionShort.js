import React from "react";

export default function stockDescriptionShort() {
  return (
    <tr className="dashboard-stock-row">
      {/* <th className="stock-info head1">Name</th> */}
      <th className="stock-info-head ">Symbol</th>
      <th className="stock-info-head ">Last</th>
      <th className="stock-info-head ">Change</th>
      <th className="stock-info-head ">Change%</th>
      <th className="stock-info-head ">Fave</th>
    </tr>
  );
}
