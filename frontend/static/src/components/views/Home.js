import "../styles/userview.css";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Article from "../structures/Article";
import React, { useState, useEffect } from "react";
import Searchbar from "../structures/SearchBar";
import LogOut from "../auth/LogOutView";

function Home() {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState("");

  const handleCategory = (c) => {
    setCategory(c);
  };

  useEffect(() => {
    const getArticles = async () => {
      const response = await fetch(`/api_v1/articles/list`);
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      const data = await response.json();
      setArticles(data);
    };
    getArticles();
  }, []);

  const articleHTML = articles.map((article) => (
    <Article key={article.id} {...article} />
  ));

  const filterCategory = (category) => {
    if (category.length === 0) {
      return articles.map((article) => (
        <Article key={article.id} {...article} />
      ));
    } else {
      return articles
        .filter((article) => article.category === category)
        .map((article) => <Article key={article.id} {...article} />);
    }
  };

  return (
    <div>
      <Container className="header-top">
        <Row>

            <div className="header">
              <div className="header-border">
                <h1 id="main-header">HackPulse News</h1>
                <img className="main-banner" />
              </div>
            </div>
     
        </Row>
        <Row>
          <div className="categories">
                <a id="article-nav" onClick={() => handleCategory("technews")}>
                  {" "}
                  tech news
                </a>
                <a id="article-nav" onClick={() => handleCategory("software")}>
                  {" "}
                  software
                </a>
                <a id="article-nav" onClick={() => handleCategory("gaming")}>
                  {" "}
                  gaming
                </a>
                <a id="article-nav" onClick={() => handleCategory("esports")}>
                  {" "}
                  e-sports
                </a>
              
              </div>
        </Row>
      </Container>
      <Container className="main-container">
        <Row>
          <Col className="main" md={7}>
            <div>{filterCategory(category)}</div>
          </Col>
          <Col className="side-bar" md={{ span: 4, offset: 1 }}>
            <div className="side-header">
              <div className="side-text-box">
                <h6>Search Articles</h6>
              </div>
            </div>
            <Row>
              <Searchbar />
              <div className="side-text-box">
                <h4>Related Articles</h4>
                <p>text text text </p>
                <p>text text text </p>
                <p>text text text </p>
                <p>text text text </p>
                <p>text text text </p>
              </div>
              <div className="side-text-box">
                <h4>Related Articles</h4>
                <p>text text text </p>
                <p>text text text </p>
                <p>text text text </p>
                <p>text text text </p>
                <p>text text text </p>
              </div>
              <div className="side-text-box">
                <h4>Related Articles</h4>
                <p>text text text </p>
                <p>text text text </p>
                <p>text text text </p>
                <p>text text text </p>
                <p>text text text </p>
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Home;
