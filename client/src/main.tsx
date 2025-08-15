import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initLenis } from "./lib/lenis";

// Initialize Lenis smooth scrolling
const lenis = initLenis();
(window as any).lenis = lenis;

createRoot(document.getElementById("root")!).render(<App />);
