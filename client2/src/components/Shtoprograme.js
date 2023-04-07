import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Wrapper from "../assets/wrappers/Tabela";
import Loading from "./Loading";
import Alert from "./Alert";
import { NavLink } from "react-router-dom";
import FormRow from "./FormRow";
import FormrowSelect from "./FormrowSelect";
import { shtoProgram, updateProgrami } from "../features/programiSlice";
const Shtoprograme = ({ programi, setProgrami }) => {
  const dispatch = useDispatch();
  const programiState = useSelector((state) => state.programiState);
  const departamentiState = useSelector((state) => state.departamentiState);
  const { departamente } = departamentiState;
  const { id } = useParams();

  const setFilter = (departamentet, value) => {
    return departamentet.filter(
      (departament) => departament.fakulteti.id === parseInt(value)
    );
  };

  console.log(departamente);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(programi);
    if (programi.id) {
      dispatch(updateProgrami(programi));
    } else {
      const newProg = {
        ...programi,
      };

      dispatch(shtoProgram(newProg));
    }

    setProgrami({
      emertimi: "",
      id: null,
      departamenti: null,
      crated: null,
      updated: null,
    });
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <FormRow
          type="text"
          name="programi"
          value={programi.emertimi}
          handleChange={(e) => {
            setProgrami({
              ...programi,
              emertimi: e.target.value,
              departamenti: id,
            });
          }}
        />
        {programi.id ? (
          <FormrowSelect
            name="departamenti"
            value={programi.departamenti}
            handleChange={(e) => {
              setProgrami({ ...programi, departamenti: e.target.value });
            }}
            lista={setFilter(departamente, programi.fakulteti)}
          />
        ) : null}

        <button
          type="submit"
          className="btn btn-block"
          disabled={
            programiState.shtoProgrameStatus === "pending" ||
            programiState.updateProgramiStatus === "pending"
          }
        >
          {programiState.shtoProgrameStatus === "pending" ||
          programiState.updateProgramiStatus === "pending"
            ? "loading..."
            : programi.id
            ? "edit program"
            : "shto program"}
        </button>

        {programiState.shtoProgrameStatus === "rejected" ? (
          <Alert variant="danger">{programiState.shtoProgrameError}</Alert>
        ) : null}
        {programiState.shtoProgrameStatus === "success" ? (
          <Alert variant="success">programi u shtua</Alert>
        ) : null}
        {programiState.updateProgramiStatus === "rejected" ? (
          <Alert variant="danger">{programiState.updateProgramiError}</Alert>
        ) : null}
        {programiState.updateProgramiStatus === "success" ? (
          <Alert variant="success">programi u perditesua</Alert>
        ) : null}
        {programiState.deleteProgramiStatus === "rejected" ? (
          <Alert variant="danger">{programiState.deleteProgramiError}</Alert>
        ) : null}
        {programiState.deleteProgramiStatus === "success" ? (
          <Alert variant="warning">programi u fshi</Alert>
        ) : null}
      </form>
    </>
  );
};

export default Shtoprograme;
