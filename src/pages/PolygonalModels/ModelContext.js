/* eslint-disable @typescript-eslint/explicit-function-return-type */
// ModelContext.js
import React, { createContext, useContext, useState } from 'react';

// 创建上下文
const ModelContext = createContext();

// 创建提供者组件，用于在组件层级中提供 model 数据
export const ModelProvider = ({ children }) => {
  const [model, setModel] = useState(null);
  const [modelType, setModelType] = useState(null);

  return <ModelContext.Provider value={{ model, setModel, modelType, setModelType }}>{children}</ModelContext.Provider>;
};

// 自定义的 Hook，用于在其他组件中访问 model 数据
export const useModelContext = () => {
  return useContext(ModelContext);
};

export const useModel = () => {
  return useModelContext();
};
