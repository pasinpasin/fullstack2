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
    { field: "renditja", header: "Renditja" },
    { field: "titullari", header: "Titullari" },
    { field: "emertimi", header: "Emertimi" },
    { field: "tipi", header: "Tipi" },
    { field: "kredite", header: "Kredite" },
    { field: "nrjave", header: "Nrjave Sem1" },
    { field: "seminare", header: "Seminare Sem 1" },
    { field: "leksione", header: "Leksione Sem 1" },
    { field: "praktika", header: "Praktika Sem 1" },
    { field: "laboratore", header: "Laboratore Sem 1" },
    { field: "nrjave", header: "Nrjave Sem2" },
    { field: "seminare", header: "Seminare Sem 2" },
    { field: "leksione", header: "Leksione Sem 2" },
    { field: "praktika", header: "Praktika Sem 2" },
    { field: "laboratore", header: "Laboratore Sem 2" },
    { field: "laboratore", header: "Tot Leks" },
    { field: "laboratore", header: "Tot Sem" },
    { field: "laboratore", header: "Tot Lab" },
    { field: "laboratore", header: "Tot praktika" },
    { field: "laboratore", header: "Ore jashte audit" },
    
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
                      <td key="emertimi" data-label="Emertimi">{mydata.emertimi}</td>
                      <td key= "tipi" data-label="Tipi" >{mydata.tipiveprimtarise}</td>
                      <td key="kredite" data-label= "Kredite" >{mydata.kredite}</td>
                      <td key= "nrjave" data-label= "Nrjave" >{mydata.nrjavesem1}</td>
                      <td key="seminare" data-label="Seminare" >{mydata.seminaresem1}</td>
                      <td key= "leksione" data-label= "Leksione" >{mydata.leksionesem1}</td>
                      <td key="praktika" data-label= "Praktika" >{mydata.praktikasem1}</td>
                      <td key="laboratore" data-label= "Laboratore" >{mydata.laboratoresem1}</td>
                      <td key= "nrjave2" data-label= "Nrjave" >{mydata.nrjavesem2}</td>
                      <td key="seminare2" data-label="Seminare" >{mydata.seminaresem2}</td>
                      <td key= "leksione2" data-label= "Leksione" >{mydata.leksionesem2}</td>
                      <td key="praktika2" data-label= "Praktika" >{mydata.praktikasem2}</td>
                      <td key="laboratore2" data-label= "Laboratore" >{mydata.laboratoresem2}</td>
                      <td key="totleks" data-label= "totleks" >{mydata.totleksione}</td>
                      <td key="totsem" data-label= "totsem" >{mydata.totseminare}</td>
                      

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
