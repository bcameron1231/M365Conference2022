// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Welcome from "./Welcome";
import "bootstrap/dist/css/bootstrap.css";
import { LightRope } from "./LightRope";
export default function App(): JSX.Element {
  return (
    <Router>
      <Container>
        <LightRope />
        <Routes>
          <Route path="/" element={<Welcome />} />
        </Routes>
      </Container>
    </Router>
  );
}
