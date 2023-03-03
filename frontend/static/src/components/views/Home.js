import "../styles/userview.css";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Article from "../structures/Article";
import React, { useState, useEffect } from "react";
import Searchbar from "../structures/SearchBar";
import LogOut from "../auth/LogOutView";
import { Link, NavLink } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';


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
        <Row id="category-nav">
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
      <Container>


      </Container>
      <Container id="main-width-container" className="main-container">
        <Row>
          <Col md={3}>
            
            <Col>
          <div className="left-text-box">
      
                <div className="side-column">
                {articles.slice(3, 6).map((article) => (
                <div key={article.id}>
                <img src={article.img} alt={article.title} style={{width: '150px',}} />
                </div>
                ))}
    
              </div>
              <div className="side-column-2">
              {articles.slice(6, 9).map((article) => (
                <div key={article.id}>
                <img src={article.img} alt={article.title} style={{width: '150px',}} />
                </div>
                ))}
                </div>
            </div> 
              
              </Col> 

              <Col>
              <div className="left-text-box">
      
      <div className="side-column">
      {articles.slice(9, 12).map((article) => (
      <div key={article.id}>
      <img src={article.img} alt={article.title} style={{width: '150px',}} />
      </div>
      ))}

    </div>
    <div className="side-column-2">
    {articles.slice(12, 15).map((article) => (
      <div key={article.id}>
      <img src={article.img} alt={article.title} style={{width: '150px',}} />
      </div>
      ))}
      </div>
  </div> 
              </Col>      
          </Col>
          <Col className="main" md={5}>
            <div className="main-article-container">
              <Carousel>
                  {filterCategory(category).map((article) => (
                    <Carousel.Item key={article.props.id}>
                      {article}
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
          </Col>
          <Col className="side-bar" md={{ span: 4 }}>
     
            <Row>

              <div className="side-text-box">
                <Row md={12} id="related-header"><h10>Related Articles</h10></Row>
                <Row>
                <Col md={12}>
                <div id="related-articles">
                {articles.slice(0, 2).map((article) => (
                <div key={article.id}>
                <img src={article.img} alt={article.title} style={{width: '100%', height: '250px'}} />
                <p className="article-name">{article.title}</p>
                </div>
                ))}
                </div>
                </Col>
                </Row>
              </div>
            </Row>
          </Col>
        </Row>
      </Container>

      {/* <div className="fixed-bottom footer">HackPulse News 2023</div> */}
    </div>
  );
}
export default Home;
