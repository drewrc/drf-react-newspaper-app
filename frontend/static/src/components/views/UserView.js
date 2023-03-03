import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Container from "react-bootstrap/esm/Container";
import { useState, useEffect } from "react";
import EditArticle from "../structures/EditArticle";
import EditRejected from "../structures/EditRejected";
import "../styles/userview.css";
import Cookies from "js-cookie";
import NewContent from "../structures/NewContentView";
import { Link } from "react-router-dom";


function Userview() {

const [display, setDisplay] = useState("articles"); 
const [articles, setArticles] = useState([]);
const [rejectedArticles, setRejectedArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      const response = await fetch(`/api_v1/articles/drafts/`);
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      const data = await response.json();
      setArticles(data);
    };
    getArticles();
  }, []);


  const handleDeleteEdit = async (id) => {
    const response = await fetch(`/api_v1/articles/edit/${id}/`, {
      method: 'DELETE',
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      }
    });
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    // Remove the deleted article from the local state
    setArticles(articles.filter(article => article.id !== id));
  };

  const handleDeleteReject = async (id) => {
    const response = await fetch(`/api_v1/articles/rejected/${id}/`, {
      method: 'DELETE',
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      }
    });
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    // Remove the deleted article from the local state
    setRejectedArticles(rejectedArticles.filter(article => article.id !== id));
  };


  const articleHTML = articles.map((article) => (
    <div key={article.id}>
    <EditArticle {...article} 
    />
      <button onClick={() => handleDeleteEdit(article.id)}>Delete</button>
    </div>
  ));

  useEffect(() => {
    const getArticles = async () => {
      const response = await fetch(`/api_v1/articles/rejected/`);
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      const data = await response.json();
      setRejectedArticles(data);
      console.log({data})
    };
    getArticles();
 
  }, []);

  const rejectedHTML= rejectedArticles.map((article) => (
    <div key={article.id}>
    <EditRejected key={article.id} {...article} 
    />
   <button onClick={() => handleDeleteReject(article.id)}>delete</button>
    </div>
  ));

  let content;
  switch (display) {
    case "article":
      content = articleHTML;
      break;
    case "rejected":
      content = rejectedHTML;
      break;
  }

  return (
    <>
            <Row id="category-nav">
          <div className="categories">
          {/* <button onClick={() => setDisplay("new")}>New Content</button> */}
          <button onClick={() => setDisplay("article")}>My Drafts</button>
          <button onClick={() => setDisplay("rejected")}>Rejected Articles</button>
          </div>
        </Row>
      <Container>
        <Row>
          <div>
            <h2>Content Creator Dashboard</h2>
          </div>
          <Col className="side-bar" md={2}>
            <h5>user profile</h5>
            <div className="user-side-bar">
              side options go here?
              <p>user profile?</p>
            </div>
          </Col>
          <Col className="main" id="user-main" md={5}>
            <NewContent />
            </Col>
        <Col md={5}>
          {content}
            {/* <h5>Drafts</h5>
            <div>{articleHTML}</div>
          </Col>
          <Col md={3}>
            <h5>Rejected articles</h5>
            <div>{rejectedHTML}</div> */}
          </Col>
          
        </Row>
      </Container>
    </>
  );
}

export default Userview;
