import React, { createContext, useContext, useState } from "react";

const EntryDatesContext = createContext();

export const EntryDatesProvider = ({ children }) => {
  const [entryDates, setEntryDates] = useState([]);

  return (
    <EntryDatesContext.Provider value={{ entryDates, setEntryDates }}>
      {children}
    </EntryDatesContext.Provider>
  );
};

export const useEntryDates = () => useContext(EntryDatesContext);
