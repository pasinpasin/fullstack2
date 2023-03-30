import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import Alert from "../components/Alert";
import Wrapper from "../assets/wrappers/Tabela";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import FormRow from "../components/FormRow";
import axios from "axios";
import PlanipdfComponent from "../components/PlanipdfComponent";

import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import useHttpClient from "../hooks/useHttpClient";
import { useParams } from "react-router-dom";

const Planipdf = () => {
  const { pid } = useParams();
  const [values, setValues] = useState();
  const [dataloading, setdataloading] = useState(true);
  //const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const {
    user,
    token,

    showAlert,
    displayAlert,
    loginUser,
    ListoFakultetet,
    fakultetet,
    SHTOFAKULTET_BEGIN,
  } = useAppContext();
  const navigate = useNavigate();

  console.log(pid);
  const getData = async () => {
    try {
      const response = await sendRequest(
        `plani/${pid}/gjeneroobjpdf`,
        "GET",
        {}
      );

      console.log(response);
      setValues(response.data.result);
      setdataloading(false);
    } catch (error) {
      console.log(error);
      setdataloading(false);
    }
  };

  useEffect(() => {
    getData();

    // eslint-disable-next-line
  }, []);

  return (
    <>
      {dataloading ? <Loading center /> : <PlanipdfComponent data={values} />}
    </>
  );
};

export default Planipdf;
