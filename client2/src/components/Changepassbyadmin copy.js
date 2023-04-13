import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import Alert from "./Alert";
import FormRow from "./FormRow";
import { changeUserPassword } from "../features/userSlice";

const Changepassbyadmin = ({ selectedUser, setChangePass }) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  console.log(selectedUser);
  const id = selectedUser.id;
  const userState = useSelector((state) => state.userState);
  const onSubmit = async (e) => {
    e.preventDefault();
    const newpass = {
      id,
      password,
    };

    dispatch(changeUserPassword(newpass))
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res.code === 200) setChangePass(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {userState.changeUserPasswordStatus === "pending" ? (
        <Loading center />
      ) : (
        <form className="form" onSubmit={onSubmit}>
          <FormRow
            type="text"
            name="password"
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn btn-block ">
            Ndrysho
          </button>
          <input
            style={{ marginLeft: "12px" }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setChangePass(false)}
          />
        </form>
      )}
    </>
  );
};

export default Changepassbyadmin;
