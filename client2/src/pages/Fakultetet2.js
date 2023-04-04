import ShtoFakultet from "../components/Shtofakultet";
import ListoFakultete from "../components/Listofakultete";
import { useState } from "react";
const Fakultetet2 = () => {
  const [fakulteti, setFakulteti] = useState({
    emertimi: "",
    id: null,
    created: null,
    updated: null,
  });

  return (
    <div>
      <ShtoFakultet fakulteti={fakulteti} setFakulteti={setFakulteti} />
      <ListoFakultete setFakulteti={setFakulteti} />
    </div>
  );
};

export default Fakultetet2;
