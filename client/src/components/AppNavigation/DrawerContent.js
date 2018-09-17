import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import TodayIcon from "@material-ui/icons/Today";
import LabelIcon from "@material-ui/icons/Label";
import InboxIcon from "@material-ui/icons/Inbox";
import CalendarIcon from "@material-ui/icons/CalendarViewDay";
import ProjectsIcon from "@material-ui/icons/Dashboard";

const routes = {
  Today: <TodayIcon />,
  Inbox: <InboxIcon />,
  Upcoming: <CalendarIcon />,
  Projects: <ProjectsIcon />,
  Tags: <LabelIcon />
};

class DrawerContent extends Component {
  constructor() {
    super();
    this.state = {
      selected: "today"
    };
  }

  render() {
    return (
      <List>
        {Object.keys(routes).map(e => (
          <ListItem
            button
            component={Link}
            to={"/" + e}
            key={e}
            selected={this.props.location.pathname === "/" + e}
          >
            <ListItemIcon>{routes[e]}</ListItemIcon>
            <ListItemText primary={e} />
          </ListItem>
        ))}
      </List>
    );
  }
}

export default withRouter(DrawerContent);