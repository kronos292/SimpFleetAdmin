import React, { Component } from "react";
import { Drawer } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";

class JobFileSummaryTableMobileSlider extends Component {
  handleDownload = job => {
    if (job.fileURL !== "") {
      window.open(job.fileURL);
    }
  };
  render() {
    return (
      <Drawer
        anchor="bottom"
        open={this.props.open}
        onClose={this.props.onClose}
        PaperProps={{
          className:
            "MuiPaper-root MuiPaper-elevation16 MuiDrawer-paper MuiDrawer-paperAnchorBottom drawer-job-file-mobile"
        }}
      >
        <h3 onClick={this.props.onClose} className="job-slide-cancel">
          Cancel
        </h3>
        <Divider className="job-file-slider-drawer-divider" />
        <Paper elevation={0} className="job-file-slider-drawer-paper">
          <List>
            <ListItem
              button
              onClick={() => {
                this.props.onClose();
                this.props.editFile(this.props.jobFile);
              }}
            >
              <ListItemText>Edit</ListItemText>
            </ListItem>
          </List>
          <List>
            <ListItem button>
              <ListItemText>Rename</ListItemText>
            </ListItem>
          </List>
          <List>
            <ListItem button onClick={this.handleDownload}>
              <ListItemText>Download</ListItemText>
            </ListItem>
          </List>
          <List>
            <ListItem
              button
              onClick={() => {
                this.props.onClose();
                this.props.deleteFile(this.props.jobFile);
              }}
            >
              <ListItemText style={{ color: "red" }}>Delete</ListItemText>
            </ListItem>
          </List>
        </Paper>
      </Drawer>
    );
  }
}

export default JobFileSummaryTableMobileSlider;
