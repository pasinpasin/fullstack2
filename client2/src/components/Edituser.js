import React, { useState } from "react";
import FormrowSelect from "./FormrowSelect";
import FormRow from "./FormRow";
import Loading from "./Loading";
import Alert from "./Alert";
import FormCheckBox from "../components/FormCheckBox";

import { useDispatch, useSelector } from "react-redux";

import { updateUser } from "../features/userSlice";

const Edituser = ({ selectedUser, setIsEditing }) => {
  const dispatch = useDispatch();
  const departamentiState = useSelector((state) => state.departamentiState);
  const userState = useSelector((state) => state.userState);
  const { departamente } = departamentiState;
  const fakultetiState = useSelector((state) => state.fakultetiState);
  const { fakultete } = fakultetiState;
  console.log(selectedUser);
  const id = selectedUser.id;

  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
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

  const [emri, setEmri] = useState(selectedUser.user.first_name);
  const [mbiemri, setMbimri] = useState(selectedUser.user.last_name);
  const [atesia, setAtesia] = useState(selectedUser.atesia);
  const [titulli, setTitulli] = useState(selectedUser.titulli);
  const [email, setEmail] = useState(selectedUser.user.email);
  const [username, setUsername] = useState(selectedUser.user.username);

  const [fakulteti, setFakulteti] = useState(
    selectedUser.departamenti.fakulteti.id
  );
  const [departamentetfilter, setDepartamentetfilter] = useState(
    setFilter(departamente, parseInt(selectedUser.departamenti.fakulteti.id))
  );

  const [checked, setChecked] = useState([...selectedUser.roli]);

  const [departamenti, setDepartamenti] = useState(
    selectedUser.departamenti.id
  );

  const handleUpdate = (e) => {
    e.preventDefault();
    const newuser = {
      user: {
        email: email,
        first_name: emri,
        last_name: mbiemri,
      },

      titulli,
      atesia,
      roli: checked,
      departamenti: departamenti,
    };

    dispatch(updateUser({ user: newuser, id }))
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res.code === 200) setIsEditing(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {userState.updateUserStatus === "pending" ? (
        <Loading center />
      ) : (
        <form className="form" onSubmit={handleUpdate}>
          {userState.updateUserStatus === "rejected" ? (
            <Alert variant="danger">{userState.updateUserError}</Alert>
          ) : null}
          <FormRow
            type="email"
            name="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />

          <FormRow
            type="texts"
            name="username"
            value={username}
            handleChange={(e) => setUsername(e.target.value)}
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
          <FormRow
            type="text"
            name="titulli"
            value={titulli}
            handleChange={(e) => setTitulli(e.target.value)}
          />

          <FormrowSelect
            name="fakulteti"
            value={fakulteti}
            handleChange={(e) => {
              setFakulteti(e.target.value);

              console.log(
                e.target.children[e.target.selectedIndex].getAttribute(
                  "data-celesi"
                )
              );
              setDepartamentetfilter(
                //...departamentetfilter,
                setFilter(departamente, e.target.value)
              );
            }}
            lista={fakultete}
          />
          <FormrowSelect
            name="departamenti"
            value={departamenti} //per te vendosur default selected value
            handleChange={(e) => {
              console.log(e.target.value);
              setDepartamenti(e.target.value);
            }}
            lista={departamentetfilter}
            //lista={setFilter(departamentet)}
          />
          <FormCheckBox name="roles" handleChange={handleCheck} arr={checked} />

          <button type="submit" className="btn btn-block ">
            Ruaj
          </button>
          <input
            style={{ marginLeft: "12px" }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </form>
      )}
    </>
  );
};

export default Edituser;
