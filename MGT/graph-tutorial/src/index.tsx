// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import { Msal2Provider } from "@microsoft/mgt-msal2-provider";
import { Providers } from "@microsoft/mgt-element";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

Providers.globalProvider = new Msal2Provider({
  clientId: "cf3f2c9c-850c-474a-8f40-5bd78f09557e",
  scopes: ["user.read", "people.read", "Calendars.Read"],
  redirectUri: "http://localhost:3000/",
});

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
