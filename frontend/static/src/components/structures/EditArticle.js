import React, { useState } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Cookies from 'js-cookie';
import Form from "react-bootstrap/Form";


function EditArticle({ id, category, title, user_name, img, text }) {
    const [editContent, setEditContent] = useState({ title, text, img });
    const [phase, setPhase] = useState("SBM")
    const [file, setFile] = useState(img);
  
    const handleImage = (e) => {
      const file = e.target.files[0];
      setEditContent({
        ...editContent,
        img: file,
      });
  
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result);
      };
      reader.readAsDataURL(file);
    };
  
    const handleSubmit = async (formData) => {
        console.log({ formData });
      const options = {
        method: "PUT",
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
        body: formData,
      };
      
      const response = await fetch(`/api_v1/articles/edit/${id}/`, options);
      const data = await response.json();
    };
  
    const handleEdit = (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append("title", editContent.title);
      formData.append("text", editContent.text);
      formData.append("phase", phase);

      if (editContent.img instanceof File) {
        formData.append("img", editContent.img);
  
        handleSubmit(formData);
      } else {

        handleSubmit(formData);
      }
      console.log({formData})
    };

    // const handleDelete = async () => {
    //     const response = await fetch(`/api_v1/articles/rejected/${id}/`, {
    //       method: 'DELETE',
    //       headers: {
    //         "X-CSRFToken": Cookies.get("csrftoken"),
    //       }
    //     });
    //     if (!response.ok) {
    //       throw new Error("Network response was not OK");
    //     }
    //     // Remove the deleted article from the local state
    //     setRejectedArticles(rejectedArticles.filter(article => article.id !== id));
    //   };
  
    return (
        
      <div className='article-container'>
               <h5>Draft Title: {title}</h5>
        <Form onSubmit={handleEdit}>
          <div key={id}>
            <div className='img-card'>
            {file ? (
              <img className="preview-image" src={file} />
            ) : (
              <img className='img-header' 
                style={{ height: '300px' }} 
                src={img} />
            )}
            <h5>Upload new image file:</h5>
            <input type="file" onChange={handleImage} />
            </div>
            <p>Edit title:</p>
            <textarea id='edit-title-container' 
            className='title' 
            style={{ height: '40px', width: '80%' }} 
            value={editContent.title} 
            onChange={e => setEditContent({ ...editContent, title: e.target.value })} />
            <p>{user_name}</p>
            <div className='text'>
              <textarea value={editContent.text} style={{ height: '100px', width: '100%' }} onChange={e => setEditContent({ ...editContent, text: e.target.value })} />
              <p>
                <button onClick={() => setPhase("DFT")}>Save Edit</button>
                <button onClick={() => setPhase("SBM")}>Submit</button>
                {/* <button onClick={handleDelete}>Delete</button> */}
              </p>
            </div>  
          </div>
        </Form>
      </div>
    );
  }
  
  export default EditArticle;
  