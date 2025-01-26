import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "@fontsource/inter";
import "./index.css";
// import { ThemeProvider } from "@material-tailwind/react";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <App />
  </StrictMode>
);
