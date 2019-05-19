import React from "react";
import { Card, Button } from "react-bootstrap";
import "./style.css";
import axios from "axios";

export default class TasksComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: []
    };
  }

  componentDidMount() {
    axios.get("/todo").then(res => {
      console.log(res);
      this.setState({
        tasks: res.data
      });
    });
  }

  render() {
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>
            {this.state.tasks[0] ? this.state.tasks[0].name : null}
          </Card.Title>
          <Card.Text>
            {this.state.tasks[0] ? this.state.tasks[0].description : null}
          </Card.Text>
          <Button variant="primary">Kliknij</Button>
        </Card.Body>
      </Card>
    );
  }
}
