import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import Listopedagoge from "../components/Listopedagoge";
const Pedagoget = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  return (
    <div>
      <button className="btn " onClick={() => navigate(-1)}>
        Back
      </button>

      <Listopedagoge id={id} />
    </div>
  );
};

export default Pedagoget;
