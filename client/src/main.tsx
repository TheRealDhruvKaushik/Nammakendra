import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Set default language for the app
document.documentElement.setAttribute('lang', 'en');

createRoot(document.getElementById("root")!).render(
  <App />
);
