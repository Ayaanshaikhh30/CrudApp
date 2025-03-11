import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { Contextprovider } from "./Component/Context/Contextprovider.jsx"; 



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Contextprovider>  {/* ✅ Wrap App inside Contextprovider */}
      <App />
    </Contextprovider>
  </StrictMode>
);
