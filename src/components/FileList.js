import React, { useEffect, useState } from "react";

const FileList = ({ onSelectFile }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
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
  }, []);

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
    <div>
      <h2>Files</h2>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            <p>Name: {file.name}</p>
            <p>Size: {file.size} bytes</p>
            <p>Extension: {file.extension}</p>
            <button onClick={() => onSelectFile(file.id)}>View Details</button>
            <button onClick={() => handleDelete(file.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
