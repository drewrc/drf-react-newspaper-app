import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Container from "react-bootstrap/esm/Container";
import Article from "../structures/Article";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Form from 'react-bootstrap/Form';

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
    <div key={article.id} className="submitted-articles-body">
      <Article {...article}      />
      <Form.Select aria-label="Default select example" onChange={(e) => setCategory(e.target.value)}>
      <option>Open this select menu</option>
      <option value="tech-news">tech news</option>
      <option value="software">software</option>
      <option value="gaming">gaming</option>
      <option value="e-sports">e-sports</option>
    </Form.Select>
      <button onClick={() => handlePublish(article.id)}>publish</button>
      <button onClick={() => handleRejected(article.id)}>rejected</button>
    </div>
  ));

  return (
    <Container>
      <Row>
        <div>
          <h2>Admin Profile</h2>
        </div>
        <Col className="main" md={7}>
          <div>{articleHTML}</div>
          {/* {console.log(articleHTML[0].key)} */}
        </Col>
        <Col md={3}>
          <h5>profile</h5>
          <div className="user-side-bar">
            side options go here?
            <p>user profile?</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminView;
