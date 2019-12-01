import React, { createContext, useReducer } from "react";
import rootReducer from "./reducers";

const initialState: any = {};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const value = { state: state, dispatch: dispatch };
  return <Provider value={value}>{children}</Provider>;
};

export { store, StateProvider };
