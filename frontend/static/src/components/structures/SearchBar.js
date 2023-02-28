import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styles/chatinput.css'
//import { api_url } from ...

function Searchbar() {
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = async (event) => {
     event.preventDefault();
}

//fetch articles here 

  return (
    <div className='search-bar'>
       <Form>
        <Row>
          <Col>
          <Form.Control placeholder="Search" />
          </Col>
        </Row>
        </Form>
     </div>
  );
}

export default Searchbar;
