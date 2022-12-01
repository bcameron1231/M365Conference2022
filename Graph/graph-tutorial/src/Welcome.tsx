// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Button, Container } from "react-bootstrap";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { useAppContext } from "./AppContext";
import Calendar from "./Calendar";

export default function Welcome() {
  const app = useAppContext();

  return (
    <div className="p-5 mb-4 bg-light rounded-3">
      <Container fluid>
        <h1>M365 Conference 2022 React Graph Tutorial</h1>
        <p className="lead">
          This sample app shows how to use the Microsoft Graph API to access a
          user's data from React
        </p>
        <AuthenticatedTemplate>
          <div>
            <h4>Welcome {app.user?.displayName || ""}!</h4>
            <Calendar />
          </div>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <Button color="primary" onClick={app.signIn!}>
            Click here to sign in
          </Button>
        </UnauthenticatedTemplate>
      </Container>
    </div>
  );
}
// </WelcomeSnippet>
