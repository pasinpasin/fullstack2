import Shtoprograme from "../components/Shtoprograme";
import Listouser from "../components/Listouser";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Users = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({
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
     

      <Listouser setUser={setUser} />
    </div>
  );
};

export default Users;
