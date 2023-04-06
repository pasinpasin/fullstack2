import Shtodepartamente from "../components/Shtodepartamente";
import Listodepartamente from "../components/Listodepartamente";
import { useParams } from "react-router-dom";
import { useState } from "react";
const Departamentet = () => {
  const { id } = useParams();
  const [departamenti, setDepartamenti] = useState({
    emertimi: "",

    fakulteti: null,
    created: null,
    updated: null,
  });

  return (
    <div>
      <Shtodepartamente
        departamenti={departamenti}
        setDepartamenti={setDepartamenti}
        id={id}
      />
      <Listodepartamente setDepartamenti={setDepartamenti} id={id} />
    </div>
  );
};

export default Departamentet;
