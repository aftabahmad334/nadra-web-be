import "./App.css";
import Router from "./router";
import { Provider } from "react-redux";
import store, { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Toaster position="bottom-right" />
        <Router />
      </PersistGate>
    </Provider>
  );
}

export default App;
