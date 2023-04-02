
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import Loading from "../components/Loading";
import Alert from "../components/Alert";
import Wrapper from "../assets/wrappers/Tabela";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import ShtoForm from "../components/ShtoForm";
import ModifikoForm from "../components/ModifikoForm";

import Tabela from "../components/Tabela";
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";

import {
  listFakultete,
  addFakultete,
 
} from '../actions/fakultetiActions'


const Fakultetet2 = () => {
  const dispatch = useDispatch()
  const fakulteteList = useSelector((state) => state.fakultetilist)  //marre nga store.js
  const {fakulteti} = useSelector((state) => state.fakultetiri)
  console.log(fakulteti)
  //const [values, setValues] = useState(initialState);
  //const navigate = useNavigate();
   

  const { loading, error, fakultetet } = fakulteteList

  const columnsData = [
    { field: "emertimi", header: "Fakulteti" },
    { field: "veprimet", header: "Veprimet" },
  ];
  const [columns, setColumns] = useState(columnsData);
  const [editing, setEditing] = useState(false);

  const [fakultetet2, setFakultetet2] = useState(fakultetet);
  
  const [formfakulteti, setformfakulteti] = useState("");
  const initialFormState = { id: null, fakulteti: "" };
  const [currentFakultet, setCurrentFakultet] = useState(initialFormState);

  const editRow = (fakultetpermodifikim) => {
    setformfakulteti("");
    setCurrentFakultet({
      id: fakultetpermodifikim.id,
      fakulteti: fakultetpermodifikim.emertimi,
    });
    //setformfakulteti(fakultetpermodifikim.emertimi);
    setEditing(true);
  };
  //console.log(currentFakultet);

  const shtoFakultet = (fakultet) => {
    setFakultetet2([...fakultetet2, fakultet]);
  };

 
  useEffect(() => {
    console.log("u thirr effect fakulteti");

   dispatch(listFakultete())
   //shtoFakultet(fakultetet)
  }, [dispatch]);

  const handleChange = (e) => {
    setformfakulteti(e.target.value);
  };

  const handleChange2 = (e) => {
    console.log(e);
    setCurrentFakultet({
      id: currentFakultet.id,
      fakulteti: e.target.value,
    });
  };

  const placeSubmitHandler = (event) => {
    event.preventDefault();
    const datatosend={"emertimi":formfakulteti}

    dispatch(addFakultete(datatosend))
   //shtoFakultet(fakulteti)
  };

  const placeSubmitHandler2 = (event) => {
    event.preventDefault();

   // ModifikoData();
  };
  let url = "/fakulteti/id/departamenti";

  return (
    <Wrapper>
      {loading || !fakultetet ? (
        <Loading center />
      ) : (
        <div>
          {editing ? (
            <>
              <h2>Edit fakultet</h2>
              {error && <Alert />}
              <ModifikoForm
                eventi={placeSubmitHandler2}
                setEditing={setEditing}
                //editrow={editRow}
                formvlera={currentFakultet.fakulteti}
                handleChange={handleChange2}
              />
            </>
          ) : (
            <>
              <h2>Shto Fakultetet</h2>
              {error && <Alert />}
              <ShtoForm
                eventi={placeSubmitHandler}
                formvlera={formfakulteti}
                loading={loading}
                handleChange={handleChange}
              />
            </>
          )}

          {fakultetet && fakultetet.length > 0 ? (
            <Tabela
              kol={columns}
              data2={fakultetet}
             // fshij={fshijFakultet}
              modifiko={editRow}
              url={url}
            />
          ) : (
            "S ka fakultete"
          )}
        </div>
      )}
    </Wrapper>
  );
};

export default Fakultetet2;
