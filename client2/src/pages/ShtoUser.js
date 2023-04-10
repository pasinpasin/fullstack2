import { useDispatch, useSelector } from "react-redux";
import FormRow from "../components/FormRow";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useHttpClient from "../hooks/useHttpClient";

import React from "react";
import FormrowSelect from "../components/FormrowSelect";
import Loading from "../components/Loading";
import FormCheckBox from "../components/FormCheckBox";
import Alert from "../components/Alert";
import { useNavigate ,Navigate} from "react-router-dom";

import { shtoUser } from "../features/userSlice";
import { getFakultete } from "../features/fakultetiSlice";
import { getDepartamente } from "../features/departamentiSlice";


const ShtoUser = () => {
 
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userState);
  const navigate = useNavigate();
  const [emri, setEmri] = useState("");
  const [mbiemri, setMbimri] = useState("");
  const [atesia, setAtesia] = useState("");
  const [titulli, setTitulli] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [passwordconfirm, SetpasswordConfirm] = useState("");
  const [fakulteti, setFakulteti] = useState(""); //permban me vone id e fakultetit
  const [departamenti, setDepartamenti] = useState("");

  const [fakultetet, setFakultetet] = useState([]);
  const [departamentet, setDepartamentet] = useState([]);
  const [departamentetfilter, setDepartamentetfilter] = useState([]);
  const [userloading, setUserloading] = useState(true);
  const [checked, setChecked] = useState([]);
  const titujt = ["Msc", "Dr", "Prof.Dr", "Doc", "Prof.Asoc. Dr"];
  const [isdepLoading, setIsdepLoading] = useState(true);
  const departamentiState = useSelector((state) => state.departamentiState);
  const { departamente } = departamentiState;
  const fakultetiState = useSelector((state) => state.fakultetiState);
  const {fakultete } = fakultetiState;

 

/*   const getFakultetet = async () => {
    try {
      const response = await sendRequest("fakulteti", "GET", {});

      setFakultetet(...fakultetet, response.data.result.items);
    } catch (error) {
      console.log(error);
    }
  };

  const getDepartamentet = async () => {
    try {
      const response = await sendRequest(`departamenti`, "GET", {});
      console.log(response);
      setDepartamentet(...departamentet, response.data.result.items);
    } catch (error) {
      console.log(error);
    } 
  };*/

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
    /* try {
    await dispatch(shtoUser(newuser)).unwrap()
    
    navigate(-1);

    }
    catch(err){
      console.log(err)
    } */
    dispatch(shtoUser(newuser)).unwrap()
    .then(() => {
      navigate("/users");
    });
   


    
   
  };

  useEffect(() => {
   
    
      dispatch(getFakultete());
      
      dispatch(getDepartamente());

     
    
  }, [dispatch]);

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

 
  // if (userState.shtoUserStatus==="success") return < Navigate to="/users" />;
  return (
    
    <>
   {(fakultetiState.getFakulteteStatus === "pending" || departamentiState.getDepartamenteStatus === "pending"
   || userState.shtoUserStatus === "pending") ? (
        <Loading center />
      ) : 
     
      (
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
                console.log(e.target.value)
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
          
          </form> </>)}
        
      
    
          </>);
};

export default ShtoUser;
