import React from "react";
import { Card, Button, Form } from "react-bootstrap";
import "./style.css";
import axios from "axios";

export default class TasksComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      newTaskName: "",
      newTaskDescription: ""
    };
  }

  componentDidMount() {
    this.getTasks();
  }

  getTasks() {
    axios.get("/todo").then(res => {
      console.log(res);
      this.setState({
        tasks: res.data
      });
    });
  }

  addNewTask = task => {
    axios
      .post("/todo", {
        name: this.state.newTaskName,
        description: "fsaf"
      })
      .then(() => {
        this.getTasks();
      });
  };

  deleteTask = id => {
    axios.delete("/todo", {
      data: {
        id: 3
      }
    });
  };

  onChange = e => {
    console.log(e.target);
    this.setState({ [e.target.name]: e.target.value });
  };

  isFormFilled = () => {
    if (this.state.newTaskName !== "" && this.state.newTaskDescription !== "") {
      return true;
    } else {
      return false;
    }
  };

  renderCard = (task, k) => {
    return (
      <Card key={k} className="task-item">
        <Card.Body>
          <Card.Title>{task.name}</Card.Title>
          <Card.Text>{task.description}</Card.Text>
        </Card.Body>
      </Card>
    );
  };

  render() {
    const tasks = this.state.tasks
      .slice(0)
      .reverse()
      .map((val, index) => {
        return this.renderCard(val, index);
      });

    return (
      <div id="tasksPage">
        <div id="tasks">{tasks}</div>
        <div id="newTask">
          <h1>Add new task:</h1>
          <Form id="newTaskForm">
            <Form.Group>
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="newTaskName"
                onChange={this.onChange}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description:</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                name="newTaskDescription"
                onChange={this.onChange}
                required
              />
            </Form.Group>
            <Button
              variant="primary"
              disabled={!this.isFormFilled()}
              onClick={this.addNewTask}
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}
