import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import client from "./apolloClient";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
// Client

//Authorization Context

// Browser Router (react Router) /login /register /home /prof

//ReactDOM.render was getting an error as its outdated. recommended to use createroot.render
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </ApolloProvider>
  </AuthProvider>
);

// ReactDOM.render(
//   <ApolloProvider client={client}>
reportWebVitals();
