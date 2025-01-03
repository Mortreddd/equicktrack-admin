import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthProvider } from "@/providers/AuthProvider";
import App from "@/App";
import { AlertProvider } from "@/providers/AlertProvider";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <AlertProvider>
      <App />
    </AlertProvider>
  </AuthProvider>
);
