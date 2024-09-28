import React, { createContext, useEffect, useState } from 'react';

export const AppContext = createContext();

export const DailyCallBack = ({ children }) => {
  const [hasRunToday, setHasRunToday] = useState(false);

  const runDailyFunction = () => {
    console.log("Function is running!");
  };

  const checkRunDailyFunction = () => {
    const lastRun = localStorage.getItem('lastRunDate');
    const today = new Date().toISOString().split('T')[0];

    if (lastRun !== today) {
      runDailyFunction();
      localStorage.setItem('lastRunDate', today);
      setHasRunToday(true);
    }
  };

  useEffect(() => {
    checkRunDailyFunction();
  }, []); 

  return (
    <AppContext.Provider value={{ hasRunToday }}>
      {children}
    </AppContext.Provider>
  );
};
