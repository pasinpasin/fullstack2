import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import FormrowSelect from "../components/FormrowSelect";
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
import { FaEdit } from "react-icons/fa";

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

  const [dhenat, setDhenat] = useState();
  const [totali, setTotalet] = useState();
  const initialFormState = { id: null, users: "" };
  const [currentUser, setCurrentUser] = useState(initialFormState);
  const [listelendesh, setListelendesh] = useState([]);
  const [lenda, setLenda] = useState();

  const editRow = (userpermodifikim) => {
    // setformusers("");
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
    setTotalet(totalet(props.sem));
    //console.log(totali)
    setListelendesh(props.sem.map((lendet) => lendet.emertimi));

    //setTotalet({ totkredite: calculateSum(dhenat, "kredite") });
  }, [dhenat, props.sem]);

  const handleChange = (e) => {
    // setformusers(e.target.value);
  };

  const handleChange2 = (e) => {
    console.log(e);
    setCurrentUser({
      id: currentUser.id,
      users: e.target.value,
    });
  };

  const fshij = async (id) => {
    if (window.confirm("Jeni te sigurte?")) {
      try {
        const response = await sendRequest(
          `/planpermbajtja/${id}`,
          "DELETE",
          {}
        );
      } catch (error) {
        console.log(error);
      }
      props.getdata();
    }
  };

  const totalet = (myarray) => {
    let newobj = myarray.reduce(
      function (previousValue, currentValue) {
        return {
          totkredite:
            currentValue.tipiveprimtarise !== "m"
              ? previousValue.totkredite + currentValue.kredite
              : previousValue.totkredite,
          totngarkesasem1:
            currentValue.tipiveprimtarise !== "m"
              ? previousValue.totngarkesasem1 +
                currentValue.leksionesem1 +
                currentValue.seminaresem1 +
                currentValue.praktikasem1 +
                currentValue.laboratoresem1
              : previousValue.totngarkesasem1,
          totngarkesasem2:
            currentValue.tipiveprimtarise !== "m"
              ? previousValue.totngarkesasem2 +
                currentValue.leksionesem2 +
                currentValue.seminaresem2 +
                currentValue.praktikasem2 +
                currentValue.laboratoresem2
              : previousValue.totngarkesasem2,
        };
      },
      { totkredite: 0, totngarkesasem1: 0, totngarkesasem2: 0 }
    );

    return newobj;
  };

  console.log(totalet(props.sem));
  const calculateSum = (array, property) => {
    const total = array.reduce((accumulator, object) => {
      return object["tipiveprimtarise"] !== "m"
        ? accumulator + object[property]
        : accumulator;
    }, 0);

    return total;
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
          <input value={totali.totkredite} readonly="readonly" name="total" />

          {dhenat && dhenat.length > 0 ? (
            <>
              <table className="classname">
                <thead>
                  <tr key="kolonat">
                    {columnsData.map((column) => (
                      <th className="classname" key={column.field}>
                        {" "}
                        {column.header}
                      </th>
                    ))}

                    <th className="classname" key="veprimet1">
                      Veprimet
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dhenat.map((mydata) => (
                    <tr key={mydata.id}>
                      <td
                        className="classname"
                        key="Renditja"
                        data-label="Renditja"
                      >
                        {mydata.renditja}
                      </td>
                      <td
                        className="classname"
                        key="Titullari"
                        data-label="Titullari"
                      >
                        {mydata.titullari}
                      </td>
                      <td
                        width="10%"
                        className="classname"
                        key="emertimi"
                        data-label="Emertimi"
                      >
                        {mydata.emertimi}
                      </td>
                      <td className="classname" key="tipi" data-label="Tipi">
                        {mydata.tipiveprimtarise}
                      </td>
                      <td
                        className="classname"
                        key="kredite"
                        data-label="Kredite"
                      >
                        {mydata.kredite}
                      </td>
                      <td
                        className="classname"
                        key="nrjave1"
                        data-label="Nrjave Sem 1"
                      >
                        {mydata.nrjavesem1}
                      </td>
                      <td
                        className="classname"
                        key="seminare"
                        data-label="Seminare Sem 1"
                      >
                        {mydata.seminaresem1}
                      </td>
                      <td
                        className="classname"
                        key="leksione"
                        data-label="Leksione Sem 1"
                      >
                        {mydata.leksionesem1}
                      </td>
                      <td
                        className="classname"
                        key="praktika"
                        data-label="Praktika Sem 1"
                      >
                        {mydata.praktikasem1}
                      </td>
                      <td
                        className="classname"
                        key="laboratore"
                        data-label="Laboratore Sem 1"
                      >
                        {mydata.laboratoresem1}
                      </td>
                      <td
                        className="classname"
                        key="nrjave2"
                        data-label="Nrjave Sem 2"
                      >
                        {mydata.nrjavesem2}
                      </td>
                      <td
                        className="classname"
                        key="seminare2"
                        data-label="Seminare Sem 2"
                      >
                        {mydata.seminaresem2}
                      </td>
                      <td
                        className="classname"
                        key="leksione2"
                        data-label="Leksione Sem 2"
                      >
                        {mydata.leksionesem2}
                      </td>
                      <td
                        className="classname"
                        key="praktika2"
                        data-label="Praktika Sem 2"
                      >
                        {mydata.praktikasem2}
                      </td>
                      <td
                        className="classname"
                        key="laboratore2"
                        data-label="Laboratore Sem 2"
                      >
                        {mydata.laboratoresem2}
                      </td>
                      <td
                        className="classname"
                        key="totleks"
                        data-label="Tot Leks"
                      >
                        {mydata.totleksione}
                      </td>
                      <td
                        className="classname"
                        key="totsem"
                        data-label="Tot Sem"
                      >
                        {mydata.totseminare}
                      </td>
                      <td key="totlab" data-label="Tot Lab">
                        {mydata.totseminare}
                      </td>
                      <td
                        className="classname"
                        key="totprak"
                        data-label="Tot Prakt"
                      >
                        {mydata.totpraktika}
                      </td>
                      <td
                        className="classname"
                        key="jaudit"
                        data-label="Ore jashte audit"
                      >
                        {}
                      </td>
                      <td key="sem1" data-label="Sem 1">
                        {mydata.semestri1}
                      </td>
                      <td className="classname" key="sem2" data-label="Sem 2">
                        {mydata.semestri2}
                      </td>

                      {
                        <td
                          className="classname"
                          key="veprimet"
                          data-label="Veprimet"
                        >
                          <Link
                            to={`/planpermbajtja/${mydata.id}/edit`}
                            title="Modifiko"
                          >
                            <FaEdit size={25} />
                          </Link>
                          <MdDelete
                            size={25}
                            onClick={() => fshij(mydata.id)}
                          />
                        </td>
                      }
                    </tr>
                  ))}
                </tbody>
              </table>
              <span>ONE THING</span>
              <table className="classname" width="50%">
                <thead>
                  <tr key="kolona2">
                    <th className="classname" key="grupi">
                      Grupi
                    </th>
                    <th className="classname" key="lenda">
                      Lenda
                    </th>

                    <th className="classname" key="veprimet2">
                      Veprimet
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dhenat.map((mydata) => (
                    <tr key={mydata.id}>
                      <td
                        className="classname"
                        key="Renditja"
                        data-label="Renditja"
                      >
                        <FormrowSelect
                          handleChange={(e) => {
                            setLenda(e.target.value);
                          }}
                          className="form-select"
                          lista={listelendesh}
                        ></FormrowSelect>
                      </td>

                      <td></td>

                      <td
                        className="classname"
                        key="veprimet"
                        data-label="Veprimet"
                      >
                        <Link
                          to={`/planpermbajtja/${mydata.id}/edit`}
                          title="Modifiko"
                        >
                          <FaEdit size={25} />
                        </Link>
                        <MdDelete size={25} onClick={() => fshij(mydata.id)} />
                      </td>
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
