import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./Pages/HomePage/HomePage.container";
import HttpCodePage from "./Pages/HttpCodePage/HttpCodePage.container";
import LostPage from "./Pages/LostPage/LostPage.container";

import "./reset.css"; // we reset all native css

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/lost" element={<LostPage />} />
        <Route path="/:httpCodeId" element={<HttpCodePage />} />
        <Route exact path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
