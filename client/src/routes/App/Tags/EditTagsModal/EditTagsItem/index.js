import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import TagColorPicker from "./TagColorPicker.js";
import TagName from "./TagName.js";
import TagDeleteButton from "./TagDeleteButton.js";

const styles = theme => ({
  item: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    borderRadius: "16px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  }
});

class EditTagsItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name
    };
  }

  handleNameUpdate = e => {
    this.setState({
      name: e.target.value
    });
  };

  handleColorUpdate = e => {
    this.setState({
      color: e.target.value
    });
  };

  render() {
    const { classes, id, color } = this.props;
    const { name } = this.state;
    return (
      <div className={classes.item}>
        <TagColorPicker id={id} color={color}/>
        <TagName id={id} name={name}/>
        <TagDeleteButton id={id} />
      </div>
    );
  }
}

EditTagsItem.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  editName: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  editColor: PropTypes.func.isRequired
};

export default withStyles(styles)(EditTagsItem);
