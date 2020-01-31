import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import "./all.min.css";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
const rootElement = document.getElementById("root");

ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
    <>
      <div className="DexterBanner">
        <p className="Title">Dexter 3 - SBIR Development v0.1</p>
      </div>
      <App />
      <div className="DexterBannerBottom">
        <p className="Title">Unclassified // FOUO</p>
      </div>
    </>
  </BrowserRouter>,
  rootElement
);

registerServiceWorker();
