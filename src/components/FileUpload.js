import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    axios
      .post("http://localhost:8080/api/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYW1ldCIsImV4cCI6MTcyMjM4MTM0MSwiaWF0IjoxNzIyMzYzMzQxfQ.bqqeq8gG5FtfiVXiHr5jQtc01_lM5dcjt2iKw47LgrE`,
        },
      })
      .then((response) => {
        alert("File uploaded successfully");
      })
      .catch((error) => {
        console.error("There was an error uploading the file!", error);
      });
  };

  return (
    <div>
      <h2>Upload File</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
