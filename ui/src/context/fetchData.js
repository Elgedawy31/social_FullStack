import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const dataContext = createContext();

export const DataContextPrivider = ({ children }) => {


    const [response , setResponse] = useState([])



 const GetData =  (ulr) =>{

    useEffect(() => {
         
       async function apiData (){


        const res = await axios.get(ulr)

        setResponse(res.data)

       }

       apiData()

    } , [ulr])


}


  return (
    <dataContext.Provider value={{ response , GetData }}>
      {children}
    </dataContext.Provider>
  );
};
