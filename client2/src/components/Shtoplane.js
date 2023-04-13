import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Wrapper from "../assets/wrappers/Tabela";
import Loading from "./Loading";
import Alert from "./Alert";
import { NavLink } from "react-router-dom";
import FormCheckBox from "./FormCheckBox";
import FormRow from "./FormRow";
import FormrowSelect from "./FormrowSelect";
import { getFakultete } from "../features/fakultetiSlice";
import { getDepartamente } from "../features/departamentiSlice";
import { shtoUser } from "../features/userSlice";
import { useNavigate, Navigate } from "react-router-dom";

const Shtoplane = ({ setIsAdding }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userState);

  const [emri, setEmri] = useState("");
  const [mbiemri, setMbimri] = useState("");
  const [atesia, setAtesia] = useState("");
  const [titulli, setTitulli] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [passwordconfirm, SetpasswordConfirm] = useState("");
  const [fakulteti, setFakulteti] = useState(""); //permban me vone id e fakultetit
  const [departamenti, setDepartamenti] = useState("");
  const [departamentetfilter, setDepartamentetfilter] = useState([]);
  const [checked, setChecked] = useState([]);
  const titujt = ["Msc", "Dr", "Prof.Dr", "Doc", "Prof.Asoc. Dr"];
  const departamentiState = useSelector((state) => state.departamentiState);
  const { departamente } = departamentiState;
  const fakultetiState = useSelector((state) => state.fakultetiState);
  const { fakultete } = fakultetiState;

  const addUser = (values) => async (dispatch) => {
    const response = await dispatch(shtoUser(values));

    setIsAdding(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const newuser = {
      user: {
        username: email,
        email: email,
        first_name: emri,
        last_name: mbiemri,
        password: password,
        confirmpassword: passwordconfirm,
      },

      titulli,
      atesia,
      roli: checked,
      departamenti,
    };

    dispatch(shtoUser(newuser))
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res.code === 200) setIsAdding(false);
      })
      .catch((error) => {
        console.log(error);
      });
    /* .then((res) => {
      //console.log(userState.updateUserStatus);
      if (userState.shtoUserStatus === "success") setIsAdding(false);
    }); */
  };

  const handleCheck = (event) => {
    var updatedList = [...checked];
    console.log(updatedList);
    if (event.target.checked) {
      // console.log(checked.includes(user.role));
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }

    setChecked(updatedList);
  };

  const setFilter = (departamentet, value) => {
    return departamentet.filter(
      (departament) => departament.fakulteti.id === parseInt(value)
    );
  };

  return (
    <>
      {userState.shtoUserStatus === "pending" ? (
        <Loading center />
      ) : (
        <>
          {userState.shtoUserStatus === "rejected" ? (
            <Alert variant="danger">{userState.shtoUserError}</Alert>
          ) : null}
          <form className="form" onSubmit={onSubmit}>
            <FormRow
              type="email"
              name="email"
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
            />

            <FormRow
              type="password"
              name="password"
              value={password}
              handleChange={(e) => setPassword(e.target.value)}
            />
            <FormRow
              type="password"
              name="passwordconfirm"
              value={passwordconfirm}
              handleChange={(e) => SetpasswordConfirm(e.target.value)}
            />
            <FormRow
              type="text"
              name="emri"
              value={emri}
              handleChange={(e) => setEmri(e.target.value)}
            />
            <FormRow
              type="text"
              name="mbiemri"
              value={mbiemri}
              handleChange={(e) => setMbimri(e.target.value)}
            />
            <FormRow
              type="text"
              name="atesia"
              value={atesia}
              handleChange={(e) => setAtesia(e.target.value)}
            />
            <FormrowSelect
              name="titulli"
              value={titulli}
              lista={titujt}
              handleChange={(e) => setTitulli(e.target.value)}
            />

            <FormrowSelect
              name="fakulteti"
              value={fakulteti}
              handleChange={(e) => {
                setFakulteti(e.target.value);
                setDepartamentetfilter(
                  //...departamentetfilter,
                  setFilter(departamente, e.target.value)
                );
              }}
              className="form-select"
              lista={fakultete}
            ></FormrowSelect>

            <FormrowSelect
              name="departamenti"
              value={departamenti}
              handleChange={(e) => {
                setDepartamenti(e.target.value);
                console.log(e.target.value);
              }}
              //lista={departamentet}
              //lista={setFilter(departamentet, fakulteti)}

              lista={departamentetfilter}
              //lista={setFilter(departamentet,e.target.value)}
            />
            <FormCheckBox
              name="roles"
              handleChange={handleCheck}
              arr={checked}
            />

            <button type="submit" className="btn btn-block ">
              Ruaj
            </button>
            <input
              style={{ marginLeft: "12px" }}
              className="muted-button"
              type="button"
              value="Cancel"
              onClick={() => setIsAdding(false)}
            />
          </form>{" "}
        </>
      )}
    </>
  );
};

export default Shtoplane;
