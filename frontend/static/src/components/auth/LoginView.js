import "../styles/loginview.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Cookies from "js-cookie";

function LoginView() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify({ username, password }),
    };
    //console.log({ options });
    const response = await fetch("/dj-rest-auth/login/", options);

    if (!response.ok) {
      console.log(response.status);
      throw new Error("Network response not OK.");
    }
    const data = await response.json();
    console.log(response.status);
    Cookies.set("Authorization", `Token ${data.key}`)
    console.log(Cookies.get("Authorization"));
    setPassword("");
    setUsername("");
  };

  return (
    // <Container id="login">
    <>
    <h2>Welcome to HackPulse</h2>
    <Container id="login-container">
      <Row>
        <h3>Log in below</h3>
      </Row>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <div className="login-text">
              <Form.Group controlId="username">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="password" className="password-box">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Form.Group>
              <Button type="submit">Login</Button>
            </div>
          </Form>
          <a className="help-links" href="#">
            <h4>Create new account</h4>
          </a>
          <a className="help-links" href="#">
            <h4>Forgot username?</h4>
          </a>
          <a className="help-links" href="#">
            <h4>Forgot password?</h4>
          </a>
        </Col>
      </Row>
    </Container>
  </>
  );
}

export default LoginView;
