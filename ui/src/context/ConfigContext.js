import { createContext, useReducer } from "react";

export const ConfigContext = createContext();

export const configReducer = (state, action) => {
  switch (action.type) {

    case 'GET_CONFIG':
      return { ...state, config: action.payload };

    case 'CREATE_NAMESPACE':
      const newNamespace = { namespace: action.payload, records: [] };
      return { ...state, config: [...state.config, newNamespace] };

    case 'REMOVE_NAMESPACE':
      let idx = action.payload;
      return { ...state, config: [...state.config.slice(0, idx), ...state.config.slice(idx + 1)]};

    case 'CREATE_RECORD':
      const record = action.payload.record;
      idx = action.payload.namespaceIdx;
      return {
        ...state,
        config: [
          ...state.config.slice(0, idx),
          {
            namespace: state.config[idx].namespace,
            records: [...state.config[idx].records, record],
          },
          ...state.config.slice(idx + 1)
        ]
      };

    case 'REMOVE_RECORD':
      const keyName = action.payload.key;
      idx = action.payload.namespaceIdx;
      return {
        ...state,
        config: [
          ...state.config.slice(0, idx),
          {
            namespace: state.config[idx].namespace,
            records: [...state.config[idx].records].filter(rec => (rec.key != keyName)),
          },
          ...state.config.slice(idx + 1)
        ]
      };

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