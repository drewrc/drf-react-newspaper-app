import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { useEffect, useState } from "react";
import "../styles/userview.css";
import Cookies from "js-cookie";

function NewContent() {
  const [newContent, setNewContent] = useState({
    title: "",
    text: "",
    img: null,
    phase: "",
  });

  const [file, setFile] = useState();
  const [phase, setPhase] = useState("SBM");

  const handleInput = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setNewContent({
      ...newContent,
      [name]: value,
    });
  };
  const handleImage = (e) => {
    const file = e.target.files[0];
    setNewContent({
      ...newContent,
      img: file,
    });

    const reader = new FileReader();
    reader.onloadend = () => {
      setFile(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    alert("submitted!");
    e.preventDefault();
    // setPhase("SBT");

    const formData = new FormData();
    formData.append("title", newContent.title);
    formData.append("text", newContent.text);
    formData.append("img", newContent.img);
    formData.append("name", newContent.name);
    formData.append("phase", phase);

    const options = {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };

    const response = await fetch("/api_v1/articles/create/", options);
    const data = await response.json();

    console.log({ data });
  };

  return (
    <>
          <Col>
            <h5>Create New Article</h5>
            <Form onSubmit={handleSubmit}>
              <div className="image-preview">
                <h5>Preview Image:</h5>
                <input type="file" onChange={handleImage} />
                <img className="preview-image" src={file} />
              </div>
              <FloatingLabel
                controlId="floatingTextarea"
                label="Article Title"
                className="mb-3"
              >
                <Form.Control
                  as="textarea"
                  placeholder="New article title"
                  name="title"
                  value={newContent.title}
                  onChange={handleInput}
                />
              </FloatingLabel>
              <FloatingLabel controlId="floatingTextarea2" label="Article Text">
                <Form.Control
                  as="textarea"
                  name="text"
                  placeholder="Type new article here..."
                  style={{ height: "100px" }}
                  value={newContent.text}
                  onChange={handleInput}
                />
              </FloatingLabel>
              <div>
                <button
                  onClick={() => setPhase("DFT")}
                  name="draft"
                  type="submit"
                >
                  Save as Draft
                </button>
                <button 
                name="submit" 
                type="submit">
                  Submit
                </button>
              </div>
            </Form>
          </Col>
    </>
  );
}

export default NewContent;
