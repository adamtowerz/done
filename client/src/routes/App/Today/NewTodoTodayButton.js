import React, { Component } from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import Zoom from "@material-ui/core/Zoom";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import gql from "graphql-tag";
import { GET_ALL_TODOS } from "../../../queries";
import moment from "moment";
import { getUuid } from "../../../auth.js";

const NEW_TODO_WITH_DO_DATE = gql`
  mutation NewTodo($authorid: UUID!, $date: Date!) {
    createTodo(input: { todo: { authorId: $authorid, doWhenDate: $date } }) {
      todo {
        id
        headline
        completed
        doWhenDate
      }
    }
  }
`;

const styles = theme => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
});

class NewTodoButton extends Component {
  handleNewTodo = newTodo => {
    newTodo({
      variables: {
        authorid: getUuid(),
        date: moment().format("YYYY-MM-DD")
      }
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Mutation
        mutation={NEW_TODO_WITH_DO_DATE}
        update={(cache, { data: { createTodo: { todo } } }) => {
          const { allTodos } = cache.readQuery({ query: GET_ALL_TODOS });
          const newNodes = allTodos.nodes.concat([todo]);
          cache.writeQuery({
            query: GET_ALL_TODOS,
            data: { allTodos: { ...allTodos, nodes: newNodes } }
          });
        }}
      >
        {(newTodo, { data, loading, error }) => (
          <Zoom in={true}>
            <Button
              variant="fab"
              color="primary"
              aria-label="Add"
              className={classes.fab}
              onClick={() => this.handleNewTodo(newTodo)}
            >
              <AddIcon />
            </Button>
          </Zoom>
        )}
      </Mutation>
    );
  }
}

NewTodoButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NewTodoButton);
