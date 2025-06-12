import React, { useState, createContext, useContext } from "react";

const TabsContext = createContext();

export function Tabs({ children, defaultValue, value, onValueChange }) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = value ?? internalValue;
  const setValue = onValueChange ?? setInternalValue;

  return (
    <TabsContext.Provider value={{ value: currentValue, setValue }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className }) {
  return (
    <div
      className={`inline-flex w-full justify-center gap-2 mb-4 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children }) {
  const { value: current, setValue } = useContext(TabsContext);
  const isActive = current === value;

  return (
    <button
      onClick={() => setValue(value)}
      className={`px-4 py-2 text-sm font-medium rounded-t-md transition-colors
        ${isActive ? "text-lisBlue border-b-2 border-lisBlue" : "text-gray-600 hover:text-lisBlue"}`}>
      {children}
    </button>
  );
}

export function TabsContent({ value, children }) {
  const { value: current } = useContext(TabsContext);
  return current === value ? <div>{children}</div> : null;
}
