import React, { useEffect, useState } from "react";
import axios from "axios";

const FileDetails = () => {
  const [file, setFile] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/files/getFile/1", {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYW1ldCIsImV4cCI6MTcyMjM4NjI3NCwiaWF0IjoxNzIyMzY4Mjc0fQ.aGqGpFZkfIecPIyBUAgnxSwMeW81RGgwXwMIrKhANv0`,
        },
      })
      .then((response) => {
        setFile(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the files!", error);
      });
  }, []);

  return (
    <div>
      <h2>Files</h2>
      <ul>
        <li key={file.id}>
          <p>Name: {file.name}</p>
          <p>Size: {file.size} bytes</p>
          <p>Extension: {file.extension}</p>
          <p>Path: {file.path}</p>
        </li>
      </ul>
    </div>
  );
};

export default FileDetails;
