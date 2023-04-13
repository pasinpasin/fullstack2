
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Shtoplane from "../components/Shtoplane";
import Listoplane from "../components/Listoplane";
const Planet = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [plani, setPlani] = useState({
    periudha: "",
    cikli: "",
    status:"",
    id: null,
    programi: null,
    created: null,
    updated: null,
  });

  return (
    <div>
      <button className="btn " onClick={() => navigate(-1)}>
        Back
      </button>
      {id ? (
        <Shtoplane plani={plani} setPlani={setPlani} />
      ) : null}

      <Listoplane setPlani={setPlani} />
    </div>
  );
};

export default Planet;
