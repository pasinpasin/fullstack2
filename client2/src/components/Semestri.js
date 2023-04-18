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
import { useDispatch, useSelector } from "react-redux";
import useHttpClient from "../hooks/useHttpClient";
import React from "react";
import { FaEdit } from "react-icons/fa";
import EditableTable from "./EditableTable";
import EditableTable2 from "./EditableTable2";

const Semestri = (props) => {
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

  const columnsData2 = [
    { field: "grupi", header: "Grupi" },
    { field: "lenda", header: "Lenda" },
  ];
  const planpermbajtjaState = useSelector((state) => state.planpermbajtjaState);
  const lendemezgjedhjeState = useSelector(
    (state) => state.lendemezgjedhjeState
  );
  const { planpermbajtja } = planpermbajtjaState;
  const { lendemezgjedhje } = lendemezgjedhjeState;

  const [zgjedhjet, setZgjedhjet] = useState();
  const [totali, setTotalet] = useState();

  const [listelendesh, setListelendesh] = useState([]);
  const [lenda, setLenda] = useState();

  useEffect(() => {
    // console.log(props.sem);
    //setZgjedhjet(props.zgjedhje)
    console.log("efekt semestri");
    setTotalet(totalet(props.sem));
    //console.log(totali)

    //setTotalet({ totkredite: calculateSum(dhenat, "kredite") });
  }, [props.sem]);

  console.log(listelendesh);

  const calculateSum = (array, property) => {
    const total = array.reduce((accumulator, object) => {
      return object["tipiveprimtarise"] !== "m"
        ? accumulator + object[property]
        : accumulator;
    }, 0);

    return total;
  };
  console.log(props.zgjedhje);

  let url = "/users/id/";

  return (
    <>
      {totali ? (
        <div>
          <input value={totali.totkredite} readOnly="readOnly" name="total" />

          <>
            <EditableTable
              columnsData={columnsData}
              viti={props.viti}
              planiid={props.planiid}
              semestridata={props.sem}
            />

            <span>ONE THING</span>
            <EditableTable2
              columnsData={columnsData2}
              viti={props.viti}
              planiid={props.planiid}
              semestridata={props.zgjedhje}
              lendepertezgjedhje={props.sem}
            />
          </>
        </div>
      ) : null}
    </>
  );
};

export default Semestri;
