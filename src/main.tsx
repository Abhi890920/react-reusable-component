import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import { Provider } from "react-redux";
import { ToastProvider } from './context/ToastContext';
import App from "./App";
import store from "./store";
import './assets/themes/material/material-light/compact/deeppurple/theme.scss';
import "./index.css";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PrimeReactProvider>
      <Provider store={store}>
        <ToastProvider>
          <App />
        </ToastProvider>
      </Provider>
    </PrimeReactProvider>
  </StrictMode>
);
