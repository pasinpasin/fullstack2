import ShtodepartamenteNgaFakulteti from "../components/ShtodepartamenteNgaFakulteti";
import ListodepartamenteNgaFakulteti from "../components/ListodepartamenteNgaFakulteti";
import { useParams } from "react-router-dom";
import { useState } from "react";
const Departamentetngafakulteti = () => {

  const { id } = useParams();
  const [departamenti, setDepartamenti] = useState({
    emertimi: "",
    id: null,
    fakulteti: id,
    created: null,
    updated: null,
  });

  return (
    <div>
      <ShtodepartamenteNgaFakulteti
        departamenti={departamenti}
        setDepartamenti={setDepartamenti}
      />
      <ListodepartamenteNgaFakulteti setDepartamenti={setDepartamenti} />
    </div>
  );
};

export default Departamentetngafakulteti;
