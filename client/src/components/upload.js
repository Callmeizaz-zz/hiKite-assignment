import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

function Upload() {
  const [email, setEmail] = useState("");
  const [key, setKey] = useState({
    inputKey: "",
  });
  const [file, setFile] = useState({
    data: null,
    name: "",
    type: "",
  });

  const fileValidation = (e) => {
    const uploadedFile = e.target.value;
    const fileName = e.target.files[0].name;
    const fileType = e.target.files[0].type;

    // allowed file types
    const allowedExt =
      /(\.doc|\.docx|\.odt|\.pdf|\.txt|\.rtf|\.wps|\.wks|\.wpd|\.xlsx|\.CSV)$/i;
    if (!allowedExt.exec(uploadedFile)) {
      alert("Invalid file type");
      e.target.value = "";
      return false;
    }
    setFile({ data: uploadedFile, name: fileName, type: fileType });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let radnomKey = Math.random().toString(36);
    setKey({ inputKey: radnomKey });
    try {
      if (file.data !== "" && file.name !== "" && file.data !== null) {
        axios
          .post("http://localhost:8091/users", {
            email: email,
            name: file.name,
            data: file.data,
            type: file.type,
          })
          .then((res) => {
            alert(JSON.stringify(res.data));
          })
          .catch((err) => {
            console.log(err);
          });
        setEmail("");
        setFile({});
      }
    } catch (error) {
      console.log(error);
    }
    e.target.value = null;
  };

  return (
    <Container>
      <h1>Upload</h1>
      <form>
        <div className="email">
          <p className="form__label">Email:</p>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="file">
          <p className="form__label">File:</p>
          <input
            type="file"
            onChange={(e) => fileValidation(e)}
            key={key.inputKey || ""}
          />
        </div>
        <button type="submit" onClick={(e) => submitHandler(e)}>
          Upload
        </button>
      </form>
    </Container>
  );
}

// Style
const Container = styled.div`
  max-width: 350px;
  margin-top: 10vh;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid#dddd;
  border-radius: 10px;
  padding: 1em 2em;
  box-shadow: 3px 3px 35px rgba(0, 0, 0, 0.5);
  h1 {
    font-size: 23px;
    margin-bottom: 10px;
  }
  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    .email {
      width: 100%;
    }
    input {
      width: 100%;
      margin-bottom: 14px;
      &:focus {
        outline: none;
      }
    }
    button {
      cursor: pointer;
      padding: 5px;
      color: #ffff;
      background-color: #328f70;
      border: 2px solid #328f70;
      border-radius: 3px;
      margin-bottom: 15px;
      font-size: 20px;
      &:focus {
        outline: none;
        border: 2px solid #328f70;
      }
    }
  }
`;

export default Upload;
