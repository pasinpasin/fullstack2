import Shtoprograme from "../components/Shtoprograme";
import Listoprograme from "../components/Listoprograme";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Programet = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [programi, setProgrami] = useState({
    emertimi: "",
    id: null,
    departamenti: null,
    created: null,
    updated: null,
  });

  return (
    <div>
      <button className="btn " onClick={() => navigate(-1)}>
        Back
      </button>
      {id ? (
        <Shtoprograme programi={programi} setProgrami={setProgrami} />
      ) : null}

      <Listoprograme setProgrami={setProgrami} />
    </div>
  );
};

export default Programet;
