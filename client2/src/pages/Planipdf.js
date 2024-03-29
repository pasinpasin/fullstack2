import { useDispatch, useSelector } from "react-redux";
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

import { useParams } from "react-router-dom";
import { pdfhtmlPlani } from "../features/planetSlice";

const Planipdf = () => {
  const { pid } = useParams();
  const dispatch = useDispatch();
  const planiState = useSelector((state) => state.planiState);
  const { planipdfhtml } = planiState;
  //const navigate = useNavigate();

  const navigate = useNavigate();

  console.log(pid);
  /*  const getData = async () => {
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
  }; */

  useEffect(() => {
    console.log("efekt plani pdf")
    dispatch(pdfhtmlPlani(pid)); 

    // eslint-disable-next-line
  }, [dispatch, pid]);

  return (
    <>
      {planiState.gjeneropdfhtmlStatus === "pending" || planipdfhtml===null ? (
        <Loading center />
      ) : (
        <PlanipdfComponent data={planipdfhtml} />
      )}
    </>
  );
};

export default Planipdf;
