import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="1099246212842-bm7tomvapuojhf8ic7ob2jq8c0pihk5b.apps.googleusercontent.com">
    <React.StrictMode>
      <StrictMode>
        <App />
      </StrictMode>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
