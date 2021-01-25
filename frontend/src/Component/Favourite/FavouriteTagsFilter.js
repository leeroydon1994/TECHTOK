import React from "react";
import IconButton from "@material-ui/core/IconButton";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import FiberManualRecordOutlinedIcon from "@material-ui/icons/FiberManualRecordOutlined";

export default class FavouriteTags extends React.Component {
  render() {
    return (
      <>
        <div className="filter-color-tags color-tags">
          <IconButton
            className={`filter-red-off off-tag-red off-tag`}
            size="small"
            disableFocusRipple
            disableRipple
            aria-label="delete"
            style={{ display: "initial" }}
            onClick={() => this.props.addTag("red")}
          >
            <FiberManualRecordOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton
            className={`filter-red-on on-tag-red on-tag`}
            size="small"
            disableFocusRipple
            disableRipple
            style={{ display: "none" }}
            onClick={() => this.props.deleteTag("red")}
          >
            <FiberManualRecordIcon fontSize="small" />
          </IconButton>

          <IconButton
            className={`filter-yellow-off off-tag-yellow off-tag`}
            size="small"
            disableFocusRipple
            disableRipple
            aria-label="delete"
            style={{ display: "initial" }}
            onClick={() => this.props.addTag("yellow")}
          >
            <FiberManualRecordOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton
            className={`filter-yellow-on on-tag-yellow on-tag`}
            size="small"
            disableFocusRipple
            disableRipple
            style={{ display: "none" }}
            onClick={() => this.props.deleteTag("yellow")}
          >
            <FiberManualRecordIcon fontSize="small" />
          </IconButton>
          <IconButton
            className={`filter-green-off off-tag-green off-tag`}
            size="small"
            disableFocusRipple
            disableRipple
            aria-label="delete"
            style={{ display: "initial" }}
            onClick={() => this.props.addTag("green")}
          >
            <FiberManualRecordOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton
            className={`filter-green-on on-tag-green on-tag`}
            size="small"
            disableFocusRipple
            disableRipple
            style={{ display: "none" }}
            onClick={() => this.props.deleteTag("green")}
          >
            <FiberManualRecordIcon fontSize="small" />
          </IconButton>
          <IconButton
            className={`filter-blue-off off-tag-blue off-tag`}
            size="small"
            disableFocusRipple
            disableRipple
            aria-label="delete"
            style={{ display: "initial" }}
            onClick={() => this.props.addTag("blue")}
          >
            <FiberManualRecordOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton
            className={`filter-blue-on on-tag-blue on-tag`}
            size="small"
            disableFocusRipple
            disableRipple
            style={{ display: "none" }}
            onClick={() => this.props.deleteTag("blue")}
          >
            <FiberManualRecordIcon fontSize="small" />
          </IconButton>
        </div>
      </>
    );
  }
}
