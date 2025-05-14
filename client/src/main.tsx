import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { registerServiceWorker } from "./lib/registerServiceWorker";

// Set default language for the app
document.documentElement.setAttribute('lang', 'en');

// Register service worker for PWA capabilities
registerServiceWorker();

createRoot(document.getElementById("root")!).render(
  <App />
);
