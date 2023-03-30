import ModifikoForm from "../components/ModifikoForm";
import { useAppContext } from "../context/appContext";
import FormRow from "../components/FormRow";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useHttpClient from "../hooks/useHttpClient";
import React from "react";
import FormrowSelect from "../components/FormrowSelect";
import Loading from "../components/Loading";
import FormCheckBox from "../components/FormCheckBox";
import Alert2 from "../components/Alert2";
import { useNavigate } from "react-router-dom";

const ModifikoUser = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { id } = useParams();
  const navigate = useNavigate();
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
  const [fakultetet, setFakultetet] = useState([]);
  const [departamentet, setDepartamentet] = useState([]);
  const [usereditloading, setUsereditloading] = useState(true);
  const [checked, setChecked] = useState([]);
  const [departamentetfilter, setDepartamentetfilter] = useState([]);

  const getData = async () => {
    try {
      const response = await sendRequest(`users/${id}`, "GET", {});
      console.log(response)
      seteditUser(response.data.result.items);
    
    } catch (error) {
      console.log(error);
    }
  };
  
  const postData = async (newuser) => {
    try {
      const response = await sendRequest(`users/${id}/`, "PATCH", newuser);
      
   
   
    navigate("/users");
    } catch (error) {
      console.log(error);
    }
  };

  const getFakultetet = async () => {
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

      setDepartamentet(...departamentet, response.data.result.items);
    } catch (error) {
      console.log(error);
    }
  };

 

  useEffect(() => {
    
    if (!edituser || edituser.id !== parseInt(id) ) {
     
      getData();
      getFakultetet();
      getDepartamentet();

    } else {
      
       
      setEmri(edituser.user.first_name);
      setMbimri(edituser.user.last_name);
      setEmail(edituser.user.email);
      setAtesia(edituser.atesia);
      //console.log(edituser)
      //setPassword(edituser.user.password);
      //setConfirmpassword(edituser.user.password);
      setUsername(edituser.user.username)
      setTitulli(edituser.titulli);
      setFakulteti(
        
        edituser.departamenti.fakulteti.id
      );
      setDepartamentetfilter(
        //...departamentetfilter,
        setFilter(departamentet, parseInt(edituser.departamenti.fakulteti.id))
      );
    

      setDepartamenti(
      
         edituser.departamenti.id,
      );
      
      setChecked([...edituser.roli]);
      //setChecked(edituser.role);
    
      setUsereditloading(false);
    }
  }, [edituser]);

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
      departamenti:departamenti,
    };
    postData(newuser);
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

  return (
    <>
      {usereditloading ? (
        <Loading center />
      ) : (
        <>
          {
            <Alert2 alertType={error.alertType} alertText={error.alertText} />
          }
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
              value={ fakulteti}
              handleChange={(e) => {
                setFakulteti(
                  e.target.value,
                
                );

              
                  
                  

                console.log(
                  e.target.children[e.target.selectedIndex].getAttribute(
                    "data-celesi"
                  )
                );
                setDepartamentetfilter(
                  //...departamentetfilter,
                  setFilter(departamentet, e.target.value)
                );
              }}
              lista={fakultetet}
            />
            <FormrowSelect
              name="departamenti"
            value={departamenti} //per te vendosur default selected value
              
              handleChange={(e) => {
                console.log(e.target.value)
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
