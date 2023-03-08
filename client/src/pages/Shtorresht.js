import { useAppContext } from "../context/appContext";
import FormRow from "../components/FormRow";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useHttpClient from "../hooks/useHttpClient";
import React from "react";
import FormrowSelect from "../components/FormrowSelect";
import Loading from "../components/Loading";
import FormCheckBox from "../components/FormCheckBox";
import Alert2 from "../components/Alert2";
import { useNavigate } from "react-router-dom";

const Shtorresht = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const navigate = useNavigate();
  const { vid, pid } = useParams();

  const [renditja, setRenditja] = useState("");
  const [titullari, settitullari] = useState("");
  const [viti, setviti] = useState("");
  const [emertimi, setemertimi] = useState("");
  const [tipiveprimtaris, settipiveprimtaris] = useState("");

  const [kredite, setkredite] = useState("");
  const [nrjavesem1, Setnrjavesem1] = useState("");
  const [seminaresem1, setseminaresem1] = useState("");
  const [leksionesem1, setleksionesem1] = useState("");

  const [praktikasem1, setpraktikasem1] = useState("");
  const [laboratoresem1, setlaboratoresem1] = useState("");
  const [nrjavesem2, setnrjavesem2] = useState("");
  const [seminaresem2, setseminaresem2] = useState("");

  const [leksionesem2, setleksionesem2] = useState("");
  const [praktikasem2, setpraktikasem2] = useState("");
  const [laboratoresem2, setlaboratoresem2] = useState("");
  const [plani, setplani] = useState("");
  const [semestri1, setsemestri1] = useState("");
  const [semestri2, setsemestri2] = useState("");
  const [dataloading, setdataloading] = useState(true);
  const [veprimatialist, setveprimatirialist] = useState([]);
  const [semlist, setsemlist] = useState([]);

  const veprimtaria = ["A", "B", "C", "D", "E", "m"];
  const sem = ["P", "F"];
  const [isdepLoading, setIsdepLoading] = useState(true);

  const postData = async (newrresht) => {
    try {
      const response = await sendRequest(`planpermbajtja/`, "POST", newrresht);
      console.log(response);
      navigate(`/plani/${pid}`);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newrresht = {
      renditja: isNaN(parseInt(renditja)) ? 1 : parseInt(renditja),
      titullari,
      viti,
      emertimi,
      tipiveprimtarise: tipiveprimtaris,
      kredite: isNaN(parseFloat(kredite)) ? 0 : parseFloat(kredite).toFixed(1),
      nrjavesem1: isNaN(parseInt(nrjavesem1)) ? 0 : nrjavesem1,
      seminaresem1: isNaN(parseFloat(seminaresem1))
        ? 0
        : parseFloat(seminaresem1).toFixed(1),
      leksionesem1: isNaN(parseFloat(leksionesem1))
        ? 0
        : parseFloat(leksionesem1).toFixed(1),
      praktikasem1: isNaN(parseFloat(praktikasem1))
        ? 0
        : parseFloat(praktikasem1).toFixed(1),
      laboratoresem1: isNaN(parseFloat(laboratoresem1))
        ? 0
        : parseFloat(laboratoresem1).toFixed(1),
      nrjavesem2: isNaN(parseInt(nrjavesem2)) ? 0 : parseInt(nrjavesem2),
      seminaresem2: isNaN(parseFloat(seminaresem2))
        ? 0
        : parseFloat(seminaresem2).toFixed(1),
      leksionesem2: isNaN(parseFloat(leksionesem2))
        ? 0
        : parseFloat(leksionesem2).toFixed(1),
      praktikasem2: isNaN(parseFloat(praktikasem2))
        ? 0
        : parseFloat(praktikasem2),
      laboratoresem2: isNaN(parseFloat(laboratoresem2))
        ? 0
        : parseFloat(laboratoresem2).toFixed(1),
      plani,
      semestri1,
      semestri2,
    };
    postData(newrresht);
  };

  useEffect(() => {
    if (dataloading) {
      setviti(vid);
      setplani(pid);
      setveprimatirialist(veprimtaria);
      setsemlist(sem);
      setdataloading(false);
    }
  }, []);

  return (
    <>
      {dataloading ? (
        <Loading center />
      ) : (
        <>
          {error.alertType !== "" ?? (
            <Alert2 alertType={error.alertType} alertText={error.alertText} />
          )}
          <Alert2 alertType={error.alertType} alertText={error.alertText} />
          <form className="form" onSubmit={onSubmit}>
            {isLoading && <Loading center />}
            <FormRow
              type="text"
              name="renditja"
              value={renditja}
              handleChange={(e) => setRenditja(e.target.value)}
            />
            <FormRow
              type="text"
              name="titullari"
              value={titullari}
              handleChange={(e) => settitullari(e.target.value)}
            />
            <FormRow
              type="text"
              name="emertimi"
              value={emertimi}
              handleChange={(e) => setemertimi(e.target.value)}
            />
            <FormrowSelect
              name="tipiveprimtarise"
              value={tipiveprimtaris}
              handleChange={(e) => {
                settipiveprimtaris(e.target.value);
              }}
              className="form-select"
              lista={veprimatialist}
            ></FormrowSelect>
            <FormRow
              type="text"
              name="kredite"
              value={kredite}
              handleChange={(e) => setkredite(e.target.value)}
            />
            <FormRow
              type="text"
              name="nrjavesem1"
              value={nrjavesem1}
              handleChange={(e) => Setnrjavesem1(e.target.value)}
            />
            <FormRow
              type="text"
              name="seminaresem1"
              value={seminaresem1}
              handleChange={(e) => setseminaresem1(e.target.value)}
            />
            <FormRow
              type="text"
              name="leksionesem1"
              value={leksionesem1}
              handleChange={(e) => setleksionesem1(e.target.value)}
            />

            <FormRow
              type="text"
              name="praktikasem1"
              value={praktikasem1}
              handleChange={(e) => setpraktikasem1(e.target.value)}
            />
            <FormRow
              type="text"
              name="laboratoresem1"
              value={laboratoresem1}
              handleChange={(e) => setlaboratoresem1(e.target.value)}
            />
            <FormRow
              type="text"
              name="nrjavesem2"
              value={nrjavesem2}
              handleChange={(e) => setnrjavesem2(e.target.value)}
            />
            <FormRow
              type="text"
              name="seminaresem2"
              value={seminaresem2}
              handleChange={(e) => setseminaresem2(e.target.value)}
            />
            <FormRow
              type="text"
              name="leksionesem2"
              value={leksionesem2}
              handleChange={(e) => setleksionesem2(e.target.value)}
            />
            <FormRow
              type="text"
              name="praktikasem2"
              value={praktikasem2}
              handleChange={(e) => setpraktikasem2(e.target.value)}
            />
            <FormRow
              type="text"
              name="laboratoresem2"
              value={laboratoresem2}
              handleChange={(e) => setlaboratoresem2(e.target.value)}
            />

            <FormrowSelect
              name="semestri1"
              value={semestri1}
              handleChange={(e) => {
                setsemestri1(e.target.value);
              }}
              className="form-select"
              lista={semlist}
            ></FormrowSelect>
            <FormrowSelect
              name="semestri2"
              value={semestri2}
              handleChange={(e) => {
                setsemestri2(e.target.value);
              }}
              className="form-select"
              lista={semlist}
            ></FormrowSelect>

            <button type="submit" className="btn btn-block ">
              Ruaj
            </button>
          </form>{" "}
        </>
      )}
    </>
  );
};

export default Shtorresht;
