import React, { useEffect, useState } from "react";
import FileContent from "./FileContent";

const FileList = () => {
  const [files, setFiles] = useState([]);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [fileToUpload, setFileToUpload] = useState(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = () => {
    fetch("http://localhost:8080/api/files/listFiles", {
      method: "GET",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYW1ldCIsImV4cCI6MTcyMjM4NjI3NCwiaWF0IjoxNzIyMzY4Mjc0fQ.aGqGpFZkfIecPIyBUAgnxSwMeW81RGgwXwMIrKhANv0`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setFiles(data);
      })
      .catch((error) => {
        console.error("There was an error fetching the files!", error);
      });
  };

  const handleFileChange = (event) => {
    setFileToUpload(event.target.files[0]);
  };

  const handleUpload = (event) => {
    event.preventDefault();

    if (!fileToUpload) return;

    const formData = new FormData();
    formData.append("file", fileToUpload);

    fetch("http://localhost:8080/api/files/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYW1ldCIsImV4cCI6MTcyMjM4NjI3NCwiaWF0IjoxNzIyMzY4Mjc0fQ.aGqGpFZkfIecPIyBUAgnxSwMeW81RGgwXwMIrKhANv0`,
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        setFileToUpload(null);
        fetchFiles();
      })
      .catch((error) => {
        console.error("There was an error uploading the file!", error);
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/files/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYW1ldCIsImV4cCI6MTcyMjM4NjI3NCwiaWF0IjoxNzIyMzY4Mjc0fQ.aGqGpFZkfIecPIyBUAgnxSwMeW81RGgwXwMIrKhANv0`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setFiles(files.filter((file) => file.id !== id));
      })
      .catch((error) => {
        console.error("There was an error deleting the file!", error);
      });
  };

  return (
    <div className="container">
      <h2>Files</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            <p>Name: {file.name}</p>
            <p>Size: {file.size} bytes</p>
            <p>Extension: {file.extension}</p>
            <button onClick={() => setSelectedFileId(file.id)}>
              View Details
            </button>
            <button className="delete" onClick={() => handleDelete(file.id)}>
              Delete
            </button>
            {selectedFileId === file.id && <FileContent fileId={file.id} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
