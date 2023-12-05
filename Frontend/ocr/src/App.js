import React, { useEffect, useState } from "react";
import axios from "axios";
import "../src/App.css";

function App() {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState("");
  const [id, setId] = useState("");
  const [identification, setIdentification] = useState({});
  const [okState, setOkState] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("http://localhost:5000/upload", formData);
      setImage(response.data.image);
      setId(response.data._id);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const analyse = async () => {
    try {
      const uri = `http://localhost:5000/api/users/${id}`;
      const response = await axios.get(uri);

      setIdentification({
        identificationNumber: response.data.identificationNumber,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        dateOfBirth: response.data.dateOfBirth,
        dateOfIssue: response.data.dateOfIssue,
        dateOfExpiry: response.data.dateOfExpiry,
      });

      setOkState("OK");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="ocr">
        <p>OCR Prodigy</p>
      </div>
      <div className="upload">
        <input type="file" onChange={handleFileChange} />
        <button type="button" className="btn2" onClick={upload}>
          Upload
        </button>
        <button type="button" className="btn" onClick={analyse}>
          Analyse
        </button>
      </div>

      <div className="par">
        <div className="img">
          <img src={`http://localhost:5000/Images/${image}`} alt="" />
        </div>
        <div className="items">
          {okState === "OK" && (
            <div>
              <p>
                First Name : <span>{identification.firstName}</span>
              </p>
              <p>
                Last Name : <span>{identification.lastName}</span>
              </p>
              <p>
                Date Of Birth : <span>{identification.dateOfBirth}</span>
              </p>
              <p>
                Issue Date : <span>{identification.dateOfIssue}</span>
              </p>
              <p>
                Expiry Date : <span>{identification.dateOfExpiry}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
