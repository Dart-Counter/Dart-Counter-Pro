import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add global font styles
document.documentElement.classList.add("font-sans");

createRoot(document.getElementById("root")!).render(<App />);
