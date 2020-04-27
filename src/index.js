import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./App.jsx";
import store from "./store";

render(
  <Provider store={store}>
    <App />
  </Provider>,
  // wrap the App in the Provider and pass in the store
  document.getElementById("root")
);
