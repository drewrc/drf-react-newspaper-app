import Col from "react-bootstrap/esm/Col"
import Row from "react-bootstrap/esm/Row"
import Container from "react-bootstrap/esm/Container"
import Article from "../structures/Article";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

function Archived() {
    const [articles, setArticles] = useState([]);
    const [phase, setPhase] = useState("SBM")
    const [img, setImg] = useState(articles.img);


    useEffect(() => {
      const getArticles = async () => {
        const response = await fetch(`/api_v1/articles/archived/`);
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        const data = await response.json();
        setArticles(data);
      };
      getArticles();
    }, []);

    
    const handleUpdateArticle = async (id, phase) => {
        // Fetch the current article object
        const response = await fetch(`/api_v1/articles/submitted/${id}/`);
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        const article = await response.json();
        
        // Update the phase property
        const updatedArticle = {
          ...article,
          phase: phase
        };
      
        // Send the updated article object to the server
        const putResponse = await fetch(`/api_v1/articles/submitted/${id}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            "X-CSRFToken": Cookies.get("csrftoken"),
          },
          body: JSON.stringify(updatedArticle)
        });
      
        if (!putResponse.ok) {
          throw new Error("Network response was not OK");
        }
      
        // Update the corresponding article in the local state
        setArticles(articles.map(article => {
          if (article.id === updatedArticle.id) {
            return updatedArticle;
          } else {
            return article;
          }
        }));
      };

      const articleHTML = articles.map((article) => (
        <div key={article.id} className="submitted-articles-body">
        <Article 
        {...article} 
        />
  
        {/* <button onClick={() => handleUpdateArticle(article.id, 'PUB')}>publish</button>
        <button onClick={() => handleUpdateArticle(article.id, 'REJ')}>delete</button> */}
        </div>
      ));

    return (
            <Container className="container-for-archived">         
                <Row className="archive-container">
                    <div>
                        <h2>Archived</h2>
                    </div>
                    <Col md={{ span: 6, offset: 3 }}>
                        <div className="article-archive">
                            {articleHTML}
                        </div>
                    </Col>
                </Row>
            </Container>
    )
}

export default Archived