import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import reducer from "./store/reducers/index";

const rootReducer = combineReducers({
  state: reducer
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

import './index.css';
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
