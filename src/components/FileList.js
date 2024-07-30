import React, { useEffect, useState } from "react";
import axios from "axios";

const FileList = () => {
  const [file, setFile] = useState();

  useEffect(() => {
    // API çağrısını yapmadan önce localStorage'dan JWT token'ını alıyoruz.

    // API'ye GET isteği gönderiyoruz.
    axios
      .get("http://localhost:8080/api/files/getFile/1", {
        headers: {
          // Authorization başlığına JWT token'ı ekliyoruz.
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYW1ldCIsImV4cCI6MTcyMjM1NjExNSwiaWF0IjoxNzIyMzM4MTE1fQ.28NzqdlnxAjA0g1XC1bEuAC-vdOj-qgNUT7wGOv6uK0`,
        },
      })
      .then((response) => {
        // API'den gelen dosya listesini state'e kaydediyoruz.
        console.log(response.data);
        setFile(response.data);
        console.log(response.data);
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

export default FileList;
