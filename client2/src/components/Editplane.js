import React, { useState } from "react";
import FormrowSelect from "./FormrowSelect";
import FormRow from "./FormRow";
import Loading from "./Loading";
import Alert from "./Alert";
import FormCheckBox from "../components/FormCheckBox";

import { useDispatch, useSelector } from "react-redux";

import { updateUser } from "../features/userSlice";
import { updatePlani } from "../features/planetSlice";

const Editplane = ({ selectedPlane, setIsEditing }) => {
  const dispatch = useDispatch();

  const planiState = useSelector((state) => state.planiState);

  const programiState = useSelector((state) => state.programiState);
  const { programe } = programiState;
  console.log(selectedPlane);
  const id = selectedPlane.id;

  const [periudha, setPeriudha] = useState(selectedPlane.periudha);
  const [cikli, setCikli] = useState(selectedPlane.cikli);

  const [programi, setProgrami] = useState(selectedPlane.programi.id);

  const handleUpdate = (e) => {
    e.preventDefault();
    const newplan = {
      id,
      periudha,
      cikli,
      programi,
    };

    dispatch(updatePlani(newplan))
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res.code === 200) setIsEditing(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {planiState.updatePlaniStatus === "pending" ? (
        <Loading center />
      ) : (
        <form className="form" onSubmit={handleUpdate}>
          {planiState.updatePlaniStatus === "rejected" ? (
            <Alert variant="danger">{planiState.updatePlaniError}</Alert>
          ) : null}

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
            value={programi} //per te vendosur default selected value
            handleChange={(e) => {
              console.log(e.target.value);
              setProgrami(e.target.value);
            }}
            lista={programe}
            //lista={setFilter(departamentet)}
          />

          <button type="submit" className="btn btn-block ">
            Ruaj
          </button>
          <input
            style={{ marginLeft: "12px" }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </form>
      )}
    </>
  );
};

export default Editplane;
