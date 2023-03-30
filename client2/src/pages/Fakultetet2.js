import { useAppContext } from "../context/appContext";
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
import axios from "axios";
import Tabela from "../components/Tabela";
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import useAxios from "../hooks/useAxios";
import {
  listFakultete,
 
} from '../actions/fakultetiActions'


const Fakultetet2 = () => {
  const dispatch = useDispatch()
  const fakulteteList = useSelector((state) => state.fakultetilist)  //marre nga store.js
  //const [values, setValues] = useState(initialState);
  //const navigate = useNavigate();


  let api = useAxios();
  const { loading, error, fakultetet } = fakulteteList

  const columnsData = [
    { field: "emertimi", header: "Fakulteti" },
    { field: "veprimet", header: "Veprimet" },
  ];
  const [columns, setColumns] = useState(columnsData);
  const [editing, setEditing] = useState(false);

  const [fakultetet2, setFakultetet2] = useState();
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

  const getData = useCallback(async () => {
    try {
      // const response = await sendRequest(
      //   "fakulteti",
      //   "GET",
      //   {},
      //   "GET_FAKULTETE"
      // );
      dispatch({
        type: "GET_FAKULTETE_BEGIN",
      });
      const { data } = await api.get("fakulteti");
      dispatch({
        type: "GET_FAKULTETE_SUCCESS",
        payload: { data },
        // payload: { fakultetet }
      });
      setFakultetet2(data.result.items);
      //setLoading(false);
      console.log(data);
    } catch (error) {
      console.log(error);
      dispatch({
        type: "GET_FAKULTETE_ERROR",
        payload: {
          msg:
            error.response.data.error.details.detail ||
            error.response.data.error.details,
        },
      });
    }
  });
  useEffect(() => {
    console.log("u thirr effect fakulteti");

   dispatch(listFakultete())
  }, []);

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

   //shtoData();
  };

  const placeSubmitHandler2 = (event) => {
    event.preventDefault();

   // ModifikoData();
  };
  let url = "/fakulteti/id/departamenti";

  return (
    <Wrapper>
      {loading ? (
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
