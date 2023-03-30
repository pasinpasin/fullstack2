import { useState, useEffect } from "react";
import useHttpClient from "../hooks/useHttpClient";
import React, { Component } from "react";
import Wrapper from "../assets/wrappers/RegisterPage";

import { useNavigate } from "react-router-dom";
import Alert2 from "../components/Alert2";
import FormRow from "../components/FormRow";

import { Link } from "react-router-dom";


const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const [udergua, setudergua] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();


  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const postData = async (body) => {
    try {

      const response = await sendRequest(`password_reset/`, "POST", body);
      if(response.status===200)
      {
        setudergua(true)
      }
      
     
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    if (!email) {
      //console.log("je ketu");
      //displayAlert();
      return;
    }
    const body={email:email}
    postData(body);
   
   

    
  };


  return (
    <>
      
      <Wrapper className="full-page">
      {
           
           udergua ?
          ( <div>
            <h3>Kontrolloni adresen email</h3>
            
          </div>) :
      
        <form className="form" onSubmit={onSubmit}>
           
      
          
           
            
        
        <Alert2 alertType={error.alertType} alertText={error.alertText} />
          <h3>{"Fjalekalim"}</h3>
       

          
          <FormRow
            type="email"
            name="Ju lutem shkruani adresen tuaj email"
            value={email}
            handleChange={handleChange}
          />
        
          <button type="submit" className="btn btn-block ">
            Dergo email
          </button>
          

        </form>
 }
      </Wrapper>
     </>
  );
};

export default ForgotPassword;