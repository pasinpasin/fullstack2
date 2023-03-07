import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import Alert2 from "../components/Alert2";
import Wrapper from "../assets/wrappers/Tabela";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import ShtoForm from "../components/ShtoForm";
import ModifikoForm from "../components/ModifikoForm";
import axios from "axios";
import Tabela from "../components/Tabela2";
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { useParams } from "react-router-dom";
import Dashboard from "./Dashboard";
import useHttpClient from "../hooks/useHttpClient";

const Semestri = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const columnsData = [
    { field: "user.first_name", header: "Renditja" },
    { field: "user.last_name", header: "Titullari" },
    { field: "titulli", header: "Emertimi" },
    { field: "departamenti.fakulteti.emertimi", header: "tipi" },
    { field: "departamenti.emertimi", header: "Kredite" },
    { field: "nrjave", header: "NRjave" },
    { field: "seminare", header: "Seminare" },
    { field: "leksione", header: "Leksione" },
    { field: "praktika", header: "Praktika" },
    { field: "laboratore", header: "Laboratore" },
    { field: "semestri", header: "Semestri" },
  ];
  const [columns, setColumns] = useState(columnsData);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dhenat1, setDhenat1] = useState();
  const [dhenat, setDhenat] = useState();
  const [formusers, setformusers] = useState("");
  const initialFormState = { id: null, users: "" };
  const [currentUser, setCurrentUser] = useState(initialFormState);

  const editRow = (userpermodifikim) => {
    setformusers("");
    setCurrentUser({
      id: userpermodifikim._id,
      users: userpermodifikim.emertimi,
    });
    //setformusers(userpermodifikim.emertimi);
    setEditing(true);
  };

  useEffect(() => {
    console.log(props.sem);

    setDhenat(props.sem);
  }, [dhenat, props.sem]);

  const handleChange = (e) => {
    setformusers(e.target.value);
  };

  const handleChange2 = (e) => {
    console.log(e);
    setCurrentUser({
      id: currentUser.id,
      users: e.target.value,
    });
  };

  const placeSubmitHandler = (event) => {
    event.preventDefault();

    //shtoData();
  };

  const placeSubmitHandler2 = (event) => {
    event.preventDefault();

    //ModifikoData();
  };
  let url = "/users/id/";

  return (
    <Wrapper>
      {isLoading || dhenat == null ? (
        <Loading center />
      ) : (
        <div>
          {error.alertType !== "" ?? (
            <Alert2 alertType={error.alertType} alertText={error.alertText} />
          )}
          {dhenat && dhenat.length > 0 ? (
            <>
              <Link to={`/users/shtouser`}>
                <button className="btn  ">Shto user</button>
              </Link>
              <table>
                <thead>
                  <tr key="kolonat">
                    {columnsData.map((column) => (
                      <th key={column.field}> {column.header}</th>
                    ))}

                    <th key="veprimet">Veprimet</th>
                  </tr>
                </thead>
                <tbody>
                  {dhenat.map((mydata) => (
                    <tr key={mydata.id}>
                      <td key="Renditja" data-label="Renditja">
                        {mydata.renditja}
                      </td>
                      <td key="Titullari" data-label="Titullari">
                        {mydata.titullari}
                      </td>

                      {
                        <td key="veprimet" data-label="Veprimet">
                          {/* <Link to={`/users/${mydata.id}/edit`} title="Shiko">
                            <FaEdit size={25} />
                          </Link>
                          <MdDelete
                            size={25}
                            onClick={() => fshij(mydata.id)}
                          />
                          <Link to={`/plani/${mydata.id}/`}>
                            <FaEye size={25} />
                          </Link> */}
                        </td>
                      }
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            "S ka user"
          )}
        </div>
      )}
    </Wrapper>
  );
};

export default Semestri;
