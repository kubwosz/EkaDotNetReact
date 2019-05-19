import React from "react";
import { Navbar, Nav, NavDropdown, FormGroup } from "react-bootstrap";
import "./style.css";

export default class NavbarComponent extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">ToDo</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/tasks">Wyświetl listę zadań</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}
