import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import Wrapper from "../assets/wrappers/Tabela";
import Loading from "../components/Loading";
import Alert from "../components/Alert";
import { NavLink } from "react-router-dom";
import FormRow from "./FormRow";
import FormrowSelect from "./FormrowSelect"
import {
  shtoDepartament,
  updateDepartamenti,
} from "../features/departamentiSlice";
const Shtodepartamente = ({ departamenti, setDepartamenti, id }) => {
  const dispatch = useDispatch();
  const departamentiState = useSelector((state) => state.departamentiState);
  const fakultetiState = useSelector((state) => state.fakultetiState);
  const { fakultete } = fakultetiState;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(departamenti)
    if (departamenti.id) {
      
      dispatch(updateDepartamenti(departamenti));
    } else {
      const newDep = {
        ...departamenti,
      };

      dispatch(shtoDepartament(newDep));
    }

     setDepartamenti({
      emertimi: "",
      id:null,
      fakulteti: null,
      crated: null,
      updated: null,
    }); 
  };

  return (
    <>
    
      <form className="form" onSubmit={handleSubmit}>
        <FormRow
          type="text"
          name="departamenti"
          value={departamenti.emertimi}
          handleChange={(e) => {
            setDepartamenti({
              ...departamenti,
              emertimi: e.target.value,
              fakulteti: id,
            });
           
          }}
        />
        { departamenti.id ?
         <FormrowSelect
              name="fakulteti"
              value={departamenti.fakulteti}
              handleChange={(e) => {
                setDepartamenti({...departamenti,fakulteti:e.target.value});
              }}
           

              lista={fakultete}
              
            />: null}

        <button
          type="submit"
          className="btn btn-block"
          disabled={
            departamentiState.shtoDepartamenteStatus === "pending" ||
            departamentiState.updateDepartamentiStatus === "pending"
          }
        >
          {departamentiState.shtoDepartamenteStatus === "pending" ||
          departamentiState.updateDepartamentiStatus === "pending"
            ? "loading..."
            : departamenti.id
            ? "edit departament"
            : "shto departament"}
        </button>

        {departamentiState.shtoDepartamenteStatus === "rejected" ? (
          <Alert variant="danger">
            {departamentiState.shtoDepartamenteError}
          </Alert>
        ) : null}
        {departamentiState.shtoDepartamenteStatus === "success" ? (
          <Alert variant="success">departamenti u shtua</Alert>
        ) : null}
        {departamentiState.updateDepartamentiStatus === "rejected" ? (
          <Alert variant="danger">
            {departamentiState.updateDepartamentiError}
          </Alert>
        ) : null}
        {departamentiState.updateDepartamentiStatus === "success" ? (
          <Alert variant="success">departamenti u perditesua</Alert>
        ) : null}
        {departamentiState.deleteFakultetiStatus === "rejected" ? (
          <Alert variant="danger">{departamentiState.deleteDepartamentiError}</Alert>
        ) : null}
        {departamentiState.deleteDepartamentiStatus === "success" ? (
          <Alert variant="warning">departamenti u fshi</Alert>
        ) : null}
      </form>
    </>
  );
};

export default Shtodepartamente;
