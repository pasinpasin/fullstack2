import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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

const Fakultetet2 = () => {
  //const [values, setValues] = useState(initialState);
  //const navigate = useNavigate();

  const {
    user,
    token,
    isLoading,
    showAlert,
    displayAlert,
    alertType,
    alertText,
    loginUser,
    ListoFakultetet,
    // fakultetet,
    sendRequest,
  } = useAppContext();

  const columnsData = [
    { field: "emertimi", header: "Fakulteti" },
    { field: "veprimet", header: "Veprimet" },
  ];
  const [columns, setColumns] = useState(columnsData);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
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

  const getData = async () => {
    try {
      const response = await sendRequest(
        "fakulteti",
        "GET",
        {},
        "GET_FAKULTETE"
      );

      setFakultetet2(response.data.result.items);

      setLoading(false);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const shtoData = async () => {
    try {
      const bodytosend = { emertimi: `${formfakulteti}` };
      //const { data } = await sendRequest(
      const response = await sendRequest(
        "fakulteti/",
        "POST",
        bodytosend,
        "SHTO_FAKULTET"
      );
      console.log(response);
      setformfakulteti("");

      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const ModifikoData = async () => {
    try {
      const bodytosend = { emertimi: `${currentFakultet.fakulteti}` };

      const response = await sendRequest(
        `fakulteti/${currentFakultet.id}/`,
        "PATCH",
        bodytosend,
        "PERDITESO_FAKULTET"
      );
    } catch (error) {
      console.log(error);
    }
    setEditing(false);
    getData();
  };

  const fshijFakultet = async (id) => {
    try {
      const RESPONSE = await sendRequest(
        `fakulteti/${id}`,
        "DELETE",
        {},
        "FSHIJ_FAKULTET"
      );
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("u thirr effect fakulteti");

    getData();
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

    shtoData();
  };

  const placeSubmitHandler2 = (event) => {
    event.preventDefault();

    ModifikoData();
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
              {showAlert && <Alert />}
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
              {showAlert && <Alert />}
              <ShtoForm
                eventi={placeSubmitHandler}
                formvlera={formfakulteti}
                loading={loading}
                handleChange={handleChange}
              />
            </>
          )}

          {fakultetet2 && fakultetet2.length > 0 ? (
            <Tabela
              kol={columns}
              data2={fakultetet2}
              fshij={fshijFakultet}
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
