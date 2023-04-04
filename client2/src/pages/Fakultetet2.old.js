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
  updateFakultete,
} from "../actions/fakultetiActions";

const Fakultetet2 = () => {
  const dispatch = useDispatch();
  const fakulteteList = useSelector((state) => state.fakultetilist); //marre nga store.js
  const { fakulteti } = useSelector((state) => state.fakultetiri);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.fakultetiupdate);

  const {
    loading: loadingcreate,
    error: errorCreate,
    success: successCreate,
  } = useSelector((state) => state.fakultetiri);

  const { loading, error, fakultetet } = fakulteteList;

  const columnsData = [
    { field: "emertimi", header: "Fakulteti" },
    { field: "veprimet", header: "Veprimet" },
  ];
  const [columns, setColumns] = useState(columnsData);
  const [editing, setEditing] = useState(false);

  const [fakultetet2, setFakultetet2] = useState(fakultetet);

  const [formfakulteti, setformfakulteti] = useState("");
  const initialFormState = { id: null, fakulteti: "" };
  const [currentFakultet, setCurrentFakultet] = useState({
    id: null,
    fakulteti: "",
  });

  const editRow = (fakultetpermodifikim) => {
    console.log(fakultetpermodifikim);
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

    dispatch(listFakultete());
    //shtoFakultet(fakultetet)
  }, [dispatch]);

  const handleChange = (e) => {
    setformfakulteti(e.target.value);
  };

  const handleChange2 = (e) => {
    console.log(e.target.value);
    setCurrentFakultet({
      id: currentFakultet.id,
      fakulteti: e.target.value,
    });

    /* this.setCurrentFakultet({
      currentFakultet: {
        ...this.state.currentFakultet,
        fakulteti: e.target.value,
      },
    }); */
    console.log(currentFakultet);
  };

  const placeSubmitHandler = (event) => {
    event.preventDefault();
    const datatosend = { emertimi: formfakulteti };

    dispatch(addFakultete(datatosend));
  };

  const placeSubmitHandler2 = (event) => {
    event.preventDefault();
    let bodytosend = {
      emertimi: currentFakultet.fakulteti,
    };
    console.log(currentFakultet);
    dispatch(updateFakultete(currentFakultet.id, bodytosend));
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
              {loadingUpdate && <Loading center />}
              {errorUpdate && <Alert variant="danger">{errorUpdate}</Alert>}
              <ModifikoForm
                eventi={placeSubmitHandler2}
                setEditing={setEditing}
                formvlera={currentFakultet.fakulteti || ""}
                handleChange={handleChange2}
              />
            </>
          ) : (
            <>
              <h2>Shto Fakultetet</h2>

              {errorCreate && <Alert variant="danger">{errorCreate}</Alert>}
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
              // fshij={() => deleteHandler()}
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
