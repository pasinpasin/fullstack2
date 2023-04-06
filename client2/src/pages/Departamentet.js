import Shtodepartamente from "../components/Shtodepartamente";
import Listodepartamente from "../components/Listodepartamente";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate} from "react-router-dom";
const Departamentet = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [departamenti, setDepartamenti] = useState({
    emertimi: "",
    id:null,
    fakulteti: null,
    created: null,
    updated: null,
  });

  return (
    <div>
      <button className="btn " onClick={() => navigate(-1)}>Back</button> 
      { id ? <Shtodepartamente
        departamenti={departamenti}
        setDepartamenti={setDepartamenti}
        id={id}
      />  : null }
     
      <Listodepartamente setDepartamenti={setDepartamenti} id={id} />
    </div>
  );
};

export default Departamentet;
