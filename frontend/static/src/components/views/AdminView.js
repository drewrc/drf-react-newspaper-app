import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Container from "react-bootstrap/esm/Container";
import Article from "../structures/Article";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Form from 'react-bootstrap/Form';
import Carousel from "react-bootstrap/Carousel";

function AdminView({ id }) {
  const [articles, setArticles] = useState([]);
  const [phase, setPhase] = useState("SBM");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const getArticles = async () => {
      const response = await fetch(`/api_v1/articles/submitted/`);
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      const data = await response.json();
      setArticles(data);
    };
    getArticles();
  }, []);

  // console.log(articles[0].key)

  const handlePublish = async (id) => {
    const options = {
      method: "PUT",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };
    const response = await fetch(
      `/api_v1/articles/publish/${category}/${id}/`,
      options
    );
    const data = await response.json();
  };

  const handleRejected = async (id) => {
    const options = {
      method: "PUT",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };
    const response = await fetch(`/api_v1/articles/reject/${id}/`, options);
    const data = await response.json();
  };

  const articleHTML = articles.map((article) => (
    <Carousel.Item key={article.id}>
    <div key={article.id} className="submitted-articles-body">
      <Article {...article}      />
      <Form.Select aria-label="Default select example" onChange={(e) => setCategory(e.target.value)}>
      <option>Select category ...</option>
      <option value="tech-news">tech news</option>
      <option value="software">software</option>
      <option value="gaming">gaming</option>
      <option value="e-sports">e-sports</option>
    </Form.Select>
    <div className="admin-controls">
      <button onClick={() => handlePublish(article.id)}>publish</button>
      <button onClick={() => handleRejected(article.id)}>rejected</button>
    </div>
    </div>
    </Carousel.Item>
  ));

  return (
    <Container  className="admin-container">
      <Row>
        <div>
          <h2>Admin Profile</h2>
        </div>
        <Col className="main" md={{ span: 6, offset: 2 }}>
        <Carousel>{articleHTML}</Carousel>
        </Col>
        <Col md={3}>
          <h5>profile</h5>
          <div className="user-side-bar">
            <p>Welcome, Admin </p>
            <p>user profile</p>
            <p>bio</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminView;
