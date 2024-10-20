import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios'

export const AppContext = createContext();

export const DailyCallBack = ({ children }) => {
  const [hasRunToday, setHasRunToday] = useState(false);

  const runDailyFunction = () => {
    console.log(1);
    axios.get('http://localhost:4433/RentIT/Controllers/trackingController.php',{   
          params:{
              status:"0"
          }
    })
    .then(response=>{
      console.log("daily",response.data);
    })
    .catch(err=>{
      console.error(err);
    })
  };

  const checkRunDailyFunction = () => {
    const lastRun = localStorage.getItem('lastRunDate');
    const today = new Date().toLocaleDateString('en-CA');

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
