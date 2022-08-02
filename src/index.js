import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import FirebaseContext from "./contexts/firebase";
import { firebase, FieldValue } from "./lib/firebase";
import { BrowserRouter } from "react-router-dom";
import "./styles/app.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{ firebase, FieldValue }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FirebaseContext.Provider>
  </React.StrictMode>
);
