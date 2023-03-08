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
import React from "react";

const Semestri = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const columnsData = [
    { field: "renditja1", header: "Renditja" },
    { field: "titullari1", header: "Titullari" },
    { field: "emertimi1", header: "Emertimi" },
    { field: "tipi1", header: "Tipi" },
    { field: "kredite1", header: "Kredite" },
    { field: "nrjavesem1", header: "Nrjave Sem1" },
    { field: "seminare11", header: "Seminare Sem 1" },
    { field: "leksione11", header: "Leksione Sem 1" },
    { field: "praktika11", header: "Praktika Sem 1" },
    { field: "laboratore11", header: "Laboratore Sem 1" },
    { field: "nrjavesem2", header: "Nrjave Sem2" },
    { field: "seminare21", header: "Seminare Sem 2" },
    { field: "leksione21", header: "Leksione Sem 2" },
    { field: "praktika21", header: "Praktika Sem 2" },
    { field: "laboratore21", header: "Laboratore Sem 2" },
    { field: "tot11", header: "Tot Leks" },
    { field: "tot21", header: "Tot Sem" },
    { field: "tot31", header: "Tot Lab" },
    { field: "tot41", header: "Tot Prakt" },
    { field: "tot51", header: "Ore jashte audit" },
    { field: "sem11", header: "Sem 1" },
    { field: "sem21", header: "Sem 2" },
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

          <Link
            to={`/planpermbajtja/shtorresht/viti/${props.viti}/plani/${props.planiid}`}
          >
            <button className="btn  ">Shto rresht</button>
          </Link>
          {dhenat && dhenat.length > 0 ? (
            <table class="classname">
              <thead>
                <tr key="kolonat">
                  {columnsData.map((column) => (
                    <th class="classname" key={column.field}>
                      {" "}
                      {column.header}
                    </th>
                  ))}

                  <th class="classname" key="veprimet1">
                    Veprimet
                  </th>
                </tr>
              </thead>
              <tbody>
                {dhenat.map((mydata) => (
                  <tr key={mydata.id}>
                    <td class="classname" key="Renditja" data-label="Renditja">
                      {mydata.renditja}
                    </td>
                    <td
                      class="classname"
                      key="Titullari"
                      data-label="Titullari"
                    >
                      {mydata.titullari}
                    </td>
                    <td class="classname" key="emertimi" data-label="Emertimi">
                      {mydata.emertimi}
                    </td>
                    <td class="classname" key="tipi" data-label="Tipi">
                      {mydata.tipiveprimtarise}
                    </td>
                    <td class="classname" key="kredite" data-label="Kredite">
                      {mydata.kredite}
                    </td>
                    <td
                      class="classname"
                      key="nrjave1"
                      data-label="Nrjave Sem 1"
                    >
                      {mydata.nrjavesem1}
                    </td>
                    <td
                      class="classname"
                      key="seminare"
                      data-label="Seminare Sem 1"
                    >
                      {mydata.seminaresem1}
                    </td>
                    <td
                      class="classname"
                      key="leksione"
                      data-label="Leksione Sem 1"
                    >
                      {mydata.leksionesem1}
                    </td>
                    <td
                      class="classname"
                      key="praktika"
                      data-label="Praktika Sem 1"
                    >
                      {mydata.praktikasem1}
                    </td>
                    <td
                      class="classname"
                      key="laboratore"
                      data-label="Laboratore Sem 1"
                    >
                      {mydata.laboratoresem1}
                    </td>
                    <td
                      class="classname"
                      key="nrjave2"
                      data-label="Nrjave Sem 2"
                    >
                      {mydata.nrjavesem2}
                    </td>
                    <td
                      class="classname"
                      key="seminare2"
                      data-label="Seminare Sem 2"
                    >
                      {mydata.seminaresem2}
                    </td>
                    <td
                      class="classname"
                      key="leksione2"
                      data-label="Leksione Sem 2"
                    >
                      {mydata.leksionesem2}
                    </td>
                    <td
                      class="classname"
                      key="praktika2"
                      data-label="Praktika Sem 2"
                    >
                      {mydata.praktikasem2}
                    </td>
                    <td
                      class="classname"
                      key="laboratore2"
                      data-label="Laboratore Sem 2"
                    >
                      {mydata.laboratoresem2}
                    </td>
                    <td class="classname" key="totleks" data-label="Tot Leks">
                      {mydata.totleksione}
                    </td>
                    <td class="classname" key="totsem" data-label="Tot Sem">
                      {mydata.totseminare}
                    </td>
                    <td key="totlab" data-label="Tot Lab">
                      {mydata.totseminare}
                    </td>
                    <td class="classname" key="totprak" data-label="Tot Prakt">
                      {mydata.totpraktika}
                    </td>
                    <td
                      class="classname"
                      key="jaudit"
                      data-label="Ore jashte audit"
                    >
                      {mydata.totseminare}
                    </td>
                    <td key="sem1" data-label="Sem 1">
                      {mydata.semestri1}
                    </td>
                    <td class="classname" key="sem2" data-label="Sem 2">
                      {mydata.semestri2}
                    </td>

                    {
                      <td
                        class="classname"
                        key="veprimet"
                        data-label="Veprimet"
                      >
                        {/* <Link to={`/planpermbajtja/${mydata.id}/edit`} title="Modifiko">
                            <FaEdit size={25} />
                          </Link>
                          <MdDelete
                            size={25}
                            onClick={() => fshij(mydata.id)}
                          />
                           */}
                      </td>
                    }
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            "S ka user"
          )}
        </div>
      )}
    </Wrapper>
  );
};

export default Semestri;
