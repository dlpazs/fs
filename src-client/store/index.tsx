import { applyMiddleware, combineReducers, compose, createStore } from "redux";

import count from "./counter/reducers";
import { CounterState } from "./counter/types";

const reducer = combineReducers({
  count
});

export interface State {
  count: CounterState;
}

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (initialState?: State) =>
  createStore(reducer, initialState, composeEnhancers(applyMiddleware()));

const store = configureStore();

export default store;
