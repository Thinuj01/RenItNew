import React, { createContext, useState,useEffect } from 'react';
import axios from 'axios';

export const GlobalContext = createContext();

export const OrderReturnTimeCheck = ({ children }) => {
    const [checkedTime, setCheckedTime] = useState(null);

    const checkItemReturnDate = async () => {
        try {
            axios.get('http://localhost:4433/RentIT/Controllers/trackingController.php',{   
                params:{
                    status:"-1"
                }
          })
          .then(response=>{
            console.log("return",response.data);
          })
            setCheckedTime(new Date());  
        } catch (error) {
            console.error('Error checking item return date:', error);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            checkItemReturnDate();
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                checkedTime,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
