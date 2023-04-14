import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Wrapper from "../assets/wrappers/Tabela";
import Loading from "./Loading";
import Alert from "./Alert";
import { NavLink } from "react-router-dom";

import FormRow from "./FormRow";
import FormrowSelect from "./FormrowSelect";

import { useNavigate, Navigate } from "react-router-dom";
import { shtoPlan } from "../features/planetSlice";

const Shtoplane = ({ setIsAdding }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userState);

  const [cikli, setCikli] = useState("");
  const [periudha, setPeriudha] = useState("");
  const [programi, setProgrami] = useState("");

  const [checked, setChecked] = useState([]);
  const titujt = ["Msc", "Dr", "Prof.Dr", "Doc", "Prof.Asoc. Dr"];
  const planiState = useSelector((state) => state.planiState);
  const { plane } = planiState;
  const programiState = useSelector((state) => state.programiState);
  const { programe } = programiState;

  const onSubmit = async (e) => {
    e.preventDefault();
    const newplan = {
      cikli,
      periudha,

      programi,
    };

    dispatch(shtoPlan(newplan))
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res.code === 200) setIsAdding(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {planiState.shtoPlaneStatuss === "pending" ? (
        <Loading center />
      ) : (
        <>
          {planiState.shtoPlaneStatus === "rejected" ? (
            <Alert variant="danger">{planiState.shtoPlaneError}</Alert>
          ) : null}
          <form className="form" onSubmit={onSubmit}>
            <FormRow
              type="text"
              name="cikli"
              value={cikli}
              handleChange={(e) => setCikli(e.target.value)}
            />
            <FormRow
              type="text"
              name="periudha"
              value={periudha}
              handleChange={(e) => setPeriudha(e.target.value)}
            />

            <FormrowSelect
              name="departamenti"
              value={programi}
              handleChange={(e) => {
                setProgrami(e.target.value);
                console.log(e.target.value);
              }}
              lista={programe}
              //lista={setFilter(departamentet,e.target.value)}
            />

            <button type="submit" className="btn btn-block ">
              Ruaj
            </button>
            <input
              style={{ marginLeft: "12px" }}
              className="muted-button"
              type="button"
              value="Cancel"
              onClick={() => setIsAdding(false)}
            />
          </form>{" "}
        </>
      )}
    </>
  );
};

export default Shtoplane;
