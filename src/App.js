import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FileUpload from "./components/FileUpload";
import FileList from "./components/FileList";
import Layout from "./components/Layout";
import "./App.css";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="upload" element={<FileUpload />} />
            <Route path="files" element={<FileList />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}
