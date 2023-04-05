import Shtodepartamente from "../components/Shtodepartamente"
import Listodepartamente from "../components/Listodepartamente"
import { useState } from "react";
const Departamentet = () => {
  const [departamenti, setDepartamenti] = useState({
    emertimi: "",
    id: null,
    created: null,
    updated: null,
  });

  return (
    <div>
      <Shtodepartamente departamenti={departamenti} setDepartamenti={setDepartamenti} />
      <Listodepartamente setDepartamenti={setDepartamenti} /> 
    </div>
  );
};

export default Departamentet;
