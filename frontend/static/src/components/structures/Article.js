import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
function Article({ id, category, title, user_name, img, text }) {
  
  return (
  
    <div className='article-container'>
      <div key={id}>
        <p> <img className='img-header' src={img} /></p>
        <div className='title'>{title}</div>
          <p>{user_name}</p>
          <div className='text'>
            <p>{text}</p>
          <p><button>Continue Reading</button></p>
        </div>  
      </div>
    </div>
  );
}

export default Article;
