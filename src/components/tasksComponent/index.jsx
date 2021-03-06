import React from "react";
import { Card, Button, Form } from "react-bootstrap";
import "./style.css";
import axios from "axios";
import ModalComponent from "../modalComponent/index";

export default class TasksComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      newTaskName: "",
      newTaskDescription: "",
      validated: false,
      isFormValidated: false,
      modalShow: false,
      taskToModal: {}
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

  addNewTask = e => {
    axios
      .post("/todo", {
        name: this.state.newTaskName,
        description: this.state.newTaskDescription
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

  renderCard = (task, k) => {
    if (task.description.length > 100) {
      var taskShortDescription = task.description.substring(0, 100);
    }

    return (
      <Card
        key={k}
        style={{ width: "18rem", margin: "1rem", cursor: "pointer" }}
        onClick={() => {
          this.setState({ modalShow: true, taskToModal: task });
        }}
      >
        <Card.Header>
          <Card.Title>{task.name}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            {taskShortDescription
              ? taskShortDescription + "..."
              : task.description}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  };

  render() {
    let modalClose = () => this.setState({ modalShow: false });

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
          <Form
            id="newTaskForm"
            onSubmit={e => {
              e.preventDefault();
            }}
          >
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
                rows="5"
                name="newTaskDescription"
                onChange={this.onChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              disabled={this.state.newTaskName === ""}
              onClick={this.addNewTask}
            >
              Submit
            </Button>
          </Form>
          <ModalComponent
            task={this.state.taskToModal}
            show={this.state.modalShow}
            onHide={modalClose}
          />
        </div>
      </div>
    );
  }
}
