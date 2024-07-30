import React, { useEffect, useState } from "react";

const FileContent = ({ fileId }) => {
  const [fileContent, setFileContent] = useState(null);

  useEffect(() => {
    if (!fileId) return;

    const jwtToken = localStorage.getItem("jwtToken");

    fetch(`http://localhost:8080/api/files/getFileContent/${fileId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYW1ldCIsImV4cCI6MTcyMjM4MTM0MSwiaWF0IjoxNzIyMzYzMzQxfQ.bqqeq8gG5FtfiVXiHr5jQtc01_lM5dcjt2iKw47LgrE`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.arrayBuffer();
      })
      .then((buffer) => {
        const byteArray = new Uint8Array(buffer);
        setFileContent(byteArray);
      })
      .catch((error) => {
        console.error("There was an error fetching the file content!", error);
      });
  }, [fileId]);

  if (!fileContent) {
    return <div>No file content available</div>;
  } else if (fileContent.length === 0) {
    return <div>No file content available</div>;
  }

  const hexContent = Array.from(fileContent)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join(" ");

  return (
    <div>
      <h2>File Content</h2>
      <pre>{hexContent}</pre>
    </div>
  );
};

export default FileContent;
