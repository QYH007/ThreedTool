/* eslint-disable @typescript-eslint/explicit-function-return-type */
// ModelContext.js
import React, { createContext, useContext, useState } from 'react';

// 创建上下文
const ModelContext = createContext();

export const ModelProvider = ({ children }) => {
  const [model, setModel] = useState(null);
  const [modelType, setModelType] = useState(null);

  return <ModelContext.Provider value={{ model, setModel, modelType, setModelType }}>{children}</ModelContext.Provider>;
};

export const useModelContext = () => {
  return useContext(ModelContext);
};

export const useModel = () => {
  return useModelContext();
};
