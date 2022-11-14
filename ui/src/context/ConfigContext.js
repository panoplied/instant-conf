import { createContext, useReducer } from "react";

export const ConfigContext = createContext();

export const configReducer = (state, action) => {
  switch (action.type) {

    case 'GET_CONFIG':
      return { ...state, config: action.payload };

    case 'CREATE_NAMESPACE':
      const newNamespace = { namespace: action.payload, records: [] };
      return { ...state, config: [...state.config, newNamespace] };

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