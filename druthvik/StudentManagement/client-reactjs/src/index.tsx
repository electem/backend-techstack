import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "font-awesome/css/font-awesome.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import DataTable from "../src/components/datatables/datatable";
import * as dataSource from "./data.json";
import "./data-table.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { IHeaderType, PropDataType } from "./types/headerType";

ReactDOM.render(
  <BrowserRouter>
    <App></App>,
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
