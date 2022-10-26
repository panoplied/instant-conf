import { createContext, useReducer, useEffect } from "react";

export const ConfigContext = createContext();

export const configReducer = (state, action) => {
  // DEBUG
  console.log(state, action);
  switch (action.type) {
    case 'GET_CONFIG':
      return { ...state, config: action.payload };
    default:
      return state;
  }
}

export const ConfigContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(configReducer, {
    config: null,
  });

  return (
    <ConfigContext.Provider value={{ ...state, dispatch }}>
      { children }
    </ConfigContext.Provider>
  );
}