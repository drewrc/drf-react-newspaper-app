import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
function Article({ id, category, title, user_name, img, text }) {
  const previewContent = text.slice(0, 200);

  return (
    <div className='article-container'>
      <div key={id}>
        <p> <img className='img-header' src={img} height='350' /></p>
        <div className='title'>{title}</div>
          <p>{user_name}</p>
          <div className='text'>
             <p className="article-content">{previewContent}...</p>
          <p><button>Continue Reading</button></p>
        </div>  
      </div>
    </div>
  );
}

export default Article;
