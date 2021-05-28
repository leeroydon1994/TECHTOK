import React from "react";
// import axios from "axios";
import "./Nasdaq100Styles.css";
// import Button from '@material-ui/core/Button';
import { Table } from "reactstrap";
import StockTable from "../StockTable/StockTable";
import StockDescriptionFull from "../StockTable/StockDescriptionFull";

export default class Nasdaq100 extends React.Component {
  render() {
    return <StockAPI />;
  }
}

class StockAPI extends React.Component {
  constructor() {
    super();

    this.state = {
      faved: false,
      nasdaqStocks: [],
    };

    this.callStockAPI = this.callStockAPI.bind(this);
  }

  componentDidMount() {
    this.callStockAPI();
  }

  async callStockAPI() {
    let urls = [
      "https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/AAPL,MSFT,AMZN,GOOG,GOOGL,FB,TSLA,NVDA,PYPL,ADBE,NFLX,CMCSA,INTC,PEP,ASML,CSCO,PDD,AVGO,QCOM,COST,TMUS,TXN,CHTR,AMGN,JD,SBUX,ZM,AMD,INTU,ISRG,BKNG,MELI,MDLZ,MU,AMAT,ADP,FISV,GILD,LRCX,ATVI,CSX,BIDU,ADSK,NTES,VRTX,WDAY,MRNA,REGN,ADI,ILMN",
      "https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/LULU,MNST,DOCU,NXPI,CTSH,KDP,KHC,MAR,EXC,ALGN,ROST,EA,IDXX,KLAC,BIIB,SNPS,MCHP,XLNX,CTAS,EBAY,CDNS,SGEN,XEL,WBA,PAYX,ALXN,DXCM,VRSK,ORLY,ANSS,PCAR,CPRT,FAST,SIRI,SPLK,DLTR,VRSN,SWKS,CERN,TTWO,MXIM,TCOM,INCY,CDW,EXPE,FOXA,CHKP,FOX,BMRN,CTXS",
      "https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/ULTA,LBTYA,LBTYK",
    ];

    try {
      let data = await Promise.all(
        urls.map((url) =>
          fetch(url, {
            method: "GET",
            headers: {
              "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
              "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
            },
          }).then((res) => res.json()),
        ),
      );

      let stockResult = [].concat(data[0], data[1], data[2]).flat(1);

      // Unify the "longName" key in each object to "name", in order to fit the syntax of database queryings
      const mappedStockResult = stockResult.map((item) => {
        let obj = { ...item };
        obj["name"] = item["longName"];
        return obj;
      });
      this.setState({
        nasdaqStocks: mappedStockResult,
      });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { nasdaqStocks } = this.state;

    return (
      <div className="nasdaq100-wrapper">
        <h1 className="nasdaq100-headline1">Nasdaq 100 Components</h1>
        <div className="nasdaq100-stocks-list">
          <div className="stocks-container">
            <Table striped className="stock-table">
              <thead>{StockDescriptionFull()}</thead>

              <tbody>
                <StockTable group="nasdaq" type={nasdaqStocks} />
              </tbody>
            </Table>
          </div>
        </div>

        <div className="button stock-refresh-button">
          {/* <Button onClick={this.callStockAPI}>Refresh</Button> */}
        </div>
      </div>
    );
  }
}

// "x-rapidapi-key": "a2ee38ed73mshd61421606491fb7p1a46d1jsnd6ecf75b7c6b"
