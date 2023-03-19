import { useState, useCallback, useRef, useEffect } from "react";
import axios from "axios";
import { useAppContext } from "../context/appContext";

const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState({ alertType: "", alertText: "" });
 
  const { authTokens } = useAppContext();

  const authFetch = axios.create({
    baseURL: "http://127.0.0.1:8000",

    headers: { Authorization: `Bearer ${authTokens?.access}` },
  });

  //const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(async (url, method, body = {}) => {
    setIsLoading(true);
    //const httpAbortCtrl = new AbortController();
    //activeHttpRequests.current.push(httpAbortCtrl);
    try {
      const response = await authFetch({
        method: method,
        url: url,
        data: body,
      });
      console.log(response)

      /*  if (response.data.message !== "success") {
        console.log(response);
        setError({ alertType: "danger", alertText: response.data.error.details });
        clearError();
        throw new Error(response); */
      
 
      setIsLoading(false);
      return response;
    } catch (err) {
      
      console.log(err);
      if (!err?.response) {
        console.log("ketu 1")
        setError({ alertType: "danger", alertText: "Gabim ne server" });
      }
      else if (error.response?.status === 400) {
        console.log("ketu 2")
        setError({ alertType: "danger", alertText: err.response.data.message });
      }
      else if (error.response?.status === 401) {
        console.log("ketu 3")
        setError({ alertType: "danger", alertText: "Nuk ejni te loguar" });
      } else {
        console.log("ketu 4")
        setError({ alertType: "danger", alertText: "Mugon lidhja me server" });
      }
        
      setIsLoading(false);
   
     
      clearError();
      throw err;
    }
  }, []);

  const clearError = () => {
    setTimeout(() => {
      setError({ alertType: "", alertText: "" });
    }, 30000);
  };

  return { isLoading, error, sendRequest, clearError };
};

export default useHttpClient;
