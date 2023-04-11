import { useDispatch, useSelector } from "react-redux";
import FormRow from "../components/FormRow";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Alert from "../components/Alert";
import React from "react";
import FormrowSelect from "../components/FormrowSelect";
import Loading from "../components/Loading";
import FormCheckBox from "../components/FormCheckBox";

import { useNavigate } from "react-router-dom";
import { getSingleUser, updateUser } from "../features/userSlice";
import { getFakultete } from "../features/fakultetiSlice";
import { getDepartamente } from "../features/departamentiSlice";

const ModifikoUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [emri, setEmri] = useState("");
  const [mbiemri, setMbimri] = useState("");
  const [atesia, setAtesia] = useState("");
  const [titulli, setTitulli] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  const [fakulteti, setFakulteti] = useState();
  const [departamenti, setDepartamenti] = useState();
  const [edituser, seteditUser] = useState(null);

  const [checked, setChecked] = useState([]);
  const [departamentetfilter, setDepartamentetfilter] = useState([]);

  const userState = useSelector((state) => state.userState);
  const { perdorues } = userState;

  const departamentiState = useSelector((state) => state.departamentiState);
  const { departamente } = departamentiState;
  const fakultetiState = useSelector((state) => state.fakultetiState);
  const { fakultete } = fakultetiState;

  

  useEffect(() => {
    console.log("u thirr")
    /*    dispatch(getUser(id)).then(() => {
        dispatch(getFakultete());
        dispatch(getDepartamente());
      }); */
    dispatch(getSingleUser(id)).then(() => {
      Promise.all([dispatch(getFakultete()), dispatch(getDepartamente())]).then(
        () => {
          console.log(fakultete.length)
          if(fakultete.length>=1 && departamente.length>=1 )
  {

    console.log(perdorues)
    setEmri(perdorues.user.first_name);
    setMbimri(perdorues.user.last_name);
    setEmail(perdorues.user.email);
    setAtesia(perdorues.atesia);
    //console.log(edituser)
    //setPassword(edituser.user.password);
    //setConfirmpassword(edituser.user.password);
    setUsername(perdorues.user.username);
    setTitulli(perdorues.titulli);
    setFakulteti(perdorues.departamenti.fakulteti.id);
    setDepartamentetfilter(
      //...departamentetfilter,
      setFilter(
        departamente,
        parseInt(perdorues.departamenti.fakulteti.id)
      )
    );

    setDepartamenti(perdorues.departamenti.id);

    setChecked([...perdorues.roli]);
    //setChecked(edituser.role);
  }
         
        }
      );
    });
  }, [dispatch]);

  const onSubmit = (e) => {
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
      .then(() => {
        navigate("/users");
      });
  };

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

  if (edituser !== null) {
  }

  return (
    <>
      {(fakultetiState.getFakulteteStatus === "pending" ||
      departamentiState.getDepartamenteStatus === "pending" ||
      userState.updateUserStatus === "pending" ||
      userState.getSingleUserStatus === "pending" )? (
        <Loading center />
      ) : (
        <>
          {userState.updateUserStatus === "rejected" ? (
            <Alert variant="danger">{userState.updateUserError}</Alert>
          ) : null}
          <form className="form" onSubmit={onSubmit}>
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
            <FormCheckBox
              name="roles"
              handleChange={handleCheck}
              arr={checked}
            />

            <button type="submit" className="btn btn-block ">
              Ruaj
            </button>
          </form>{" "}
        </>
      )}
    </>
  );
};

export default ModifikoUser;
