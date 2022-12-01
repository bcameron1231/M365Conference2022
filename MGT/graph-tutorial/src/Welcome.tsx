// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// <WelcomeSnippet>
import { Container } from "react-bootstrap";
import { Agenda, Login, Providers, ProviderState } from "@microsoft/mgt-react";
import { useEffect, useState } from "react";

export default function Welcome() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const updateState = () => {
      const provider = Providers.globalProvider;
      setIsSignedIn(provider && provider.state === ProviderState.SignedIn);
    };

    Providers.onProviderUpdated(updateState);
    updateState();

    return () => {
      Providers.removeProviderUpdatedListener(updateState);
    };
  }, []);

  return (
    <div className="p-5 mb-4 bg-light rounded-3">
      <Container fluid>
        <h1>M365 Conference 2022 React MGT Tutorial</h1>
        <p className="lead">
          This sample app shows how to use the Microsoft Graph Toolkit to access
          a user's data from React
        </p>
        {isSignedIn && (
          <Agenda event-query="/me/events?orderby=start/dateTime" />
        )}

        {!isSignedIn && <Login />}
      </Container>
    </div>
  );
}
// </WelcomeSnippet>
