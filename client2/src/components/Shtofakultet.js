import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteFakulteti,
  getFakultete,
  shtoFakultet,
  updateFakulteti,
} from "../features/fakultetiSlice";
import Wrapper from "../assets/wrappers/Tabela";
import Loading from "../components/Loading";
import Alert from "../components/Alert";
import { NavLink } from "react-router-dom";
import FormRow from "./FormRow";
const Shtofakultet = ({ fakulteti, setFakulteti }) => {
  const dispatch = useDispatch();
  const fakultetiState = useSelector((state) => state.fakultetiState);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (fakulteti.id) {
      dispatch(updateFakulteti(fakulteti));
    } else {
      const newFakultet = {
        ...fakulteti,
      };

      console.log(newFakultet);
      dispatch(shtoFakultet(newFakultet));
    }

    setFakulteti({
      emertimi: "",
      id: null,
      crated: null,
      updated: null,
    });
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <FormRow
          type="text"
          name="fakulteti"
          value={fakulteti.emertimi}
          handleChange={(e) => {
            setFakulteti({ ...fakulteti, emertimi: e.target.value });
            console.log(fakulteti);
          }}
        />

        <button
          type="submit"
          className="btn btn-block "
          disabled={
            fakultetiState.shtofakulteteStatus === "pending" ||
            fakultetiState.updateFakultetiStatus === "pending"
          }
        >
          {fakultetiState.shtofakulteteStatus === "pending" ||
          fakultetiState.updateFakultetiStatus === "pending"
            ? "loading..."
            : fakulteti.id
            ? "edit fakultet"
            : "shto fakultet"}
        </button>

        {fakultetiState.shtofakulteteStatus === "rejected" ? (
          <Alert variant="danger">{fakultetiState.shtofakulteteError}</Alert>
        ) : null}
        {fakultetiState.shtofakulteteStatus === "success" ? (
          <Alert variant="success">fakulteti u shtua</Alert>
        ) : null}
        {fakultetiState.updateFakultetiStatus === "rejected" ? (
          <Alert variant="danger">{fakultetiState.updateFakultetiError}</Alert>
        ) : null}
        {fakultetiState.updateFakultetiStatus === "success" ? (
          <Alert variant="success">fakulteti u perditesua</Alert>
        ) : null}
        {fakultetiState.deleteFakultetiStatus === "rejected" ? (
          <Alert variant="danger">{fakultetiState.deleteTodoError}</Alert>
        ) : null}
        {fakultetiState.deleteFakultetiStatus === "success" ? (
          <Alert variant="warning">fakulteti u fshi</Alert>
        ) : null}
      </form>
    </>
  );
};

export default Shtofakultet;
