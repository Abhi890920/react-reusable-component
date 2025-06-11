import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import { Toast } from 'primereact/toast';
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PrimeReactProvider>
      <Provider store={store}>
        <Toast />
        <App />
      </Provider>
    </PrimeReactProvider>
  </StrictMode>
);
