import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import Alert from "./Alert";
import FormRow from "./FormRow";
import { changeUserPassword } from "../features/userSlice";
import { useLocation } from "react-router-dom";

const Changepassbyadmin = () => {
  const [password, setPassword] = useState("");
  const location = useLocation();
  console.log(location.search);
  const [token, setToken] = useState(
    new URLSearchParams(location.search).get("token")
  );
  const onSubmit = async (e) => {
    e.preventDefault();

    /*  dispatch(changeUserPassword(newpass))
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res.code === 200) setChangePass(false);
      })
      .catch((error) => {
        console.log(error);
      }); */
  };
  return (
    <>
      <form className="form" onSubmit={onSubmit}>
        <FormRow
          type="text"
          name="password"
          value={password}
          handleChange={(e) => setPassword(e.target.value)}
        />
        <FormRow
          type="text"
          name="token"
          value={token}
          handleChange={(e) => setToken()}
        />
        <button type="submit" className="btn btn-block ">
          Ndrysho
        </button>
        <input
          style={{ marginLeft: "12px" }}
          className="muted-button"
          type="button"
          value="Cancel"
        />
      </form>
    </>
  );
};

export default Changepassbyadmin;
