import React from "react";
import IconButton from "@material-ui/core/IconButton";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import FiberManualRecordOutlinedIcon from "@material-ui/icons/FiberManualRecordOutlined";

export default class FavouriteTags extends React.Component {
  render() {
    let symbol = this.props.stockName;
    return (
      <td>
        <div className="color-tags">
          <IconButton
            className={`${symbol}-red-off off-tag-red off-tag`}
            size="small"
            disableFocusRipple
            disableRipple
            aria-label="delete"
            style={{ display: "initial" }}
            onClick={() => this.props.addTag(symbol, "red")}
          >
            <FiberManualRecordOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton
            className={`${symbol}-red-on on-tag-red on-tag`}
            size="small"
            disableFocusRipple
            disableRipple
            style={{ display: "none" }}
            onClick={() => this.props.deleteTag(symbol, "red")}
          >
            <FiberManualRecordIcon fontSize="small" />
          </IconButton>

          <IconButton
            className={`${symbol}-yellow-off off-tag-yellow off-tag`}
            size="small"
            disableFocusRipple
            disableRipple
            aria-label="delete"
            style={{ display: "initial" }}
            onClick={() => this.props.addTag(symbol, "yellow")}
          >
            <FiberManualRecordOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton
            className={`${symbol}-yellow-on on-tag-yellow on-tag`}
            size="small"
            disableFocusRipple
            disableRipple
            style={{ display: "none" }}
            onClick={() => this.props.deleteTag(symbol, "yellow")}
          >
            <FiberManualRecordIcon fontSize="small" />
          </IconButton>
          <IconButton
            className={`${symbol}-green-off off-tag-green off-tag`}
            size="small"
            disableFocusRipple
            disableRipple
            aria-label="delete"
            style={{ display: "initial" }}
            onClick={() => this.props.addTag(symbol, "green")}
          >
            <FiberManualRecordOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton
            className={`${symbol}-green-on on-tag-green on-tag`}
            size="small"
            disableFocusRipple
            disableRipple
            style={{ display: "none" }}
            onClick={() => this.props.deleteTag(symbol, "green")}
          >
            <FiberManualRecordIcon fontSize="small" />
          </IconButton>
          <IconButton
            className={`${symbol}-blue-off off-tag-blue off-tag`}
            size="small"
            disableFocusRipple
            disableRipple
            aria-label="delete"
            style={{ display: "initial" }}
            onClick={() => this.props.addTag(symbol, "blue")}
          >
            <FiberManualRecordOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton
            className={`${symbol}-blue-on on-tag-blue on-tag`}
            size="small"
            disableFocusRipple
            disableRipple
            style={{ display: "none" }}
            onClick={() => this.props.deleteTag(symbol, "blue")}
          >
            <FiberManualRecordIcon fontSize="small" />
          </IconButton>
        </div>
      </td>
    );
  }
}
