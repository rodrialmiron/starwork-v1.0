import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store/store.js";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import axios from "axios"

// axios.defaults.baseURL = "http://localhost:3001"
axios.defaults.baseURL = "https://back-starwork.vercel.app"
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);