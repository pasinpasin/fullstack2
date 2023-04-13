import Listouser from "../components/Listouser";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Shtouser from "../components/Shtouser";
import Edituser from "../components/Edituser";
import Loading from "../components/Loading";
import Alert from "../components/Alert";
import {
  changePlaniPassword,
  deletePlani,
  getPlani,
  updatePlani,
} from "../features/planetSlice";

import { getPrograme } from "../features/programiSlice";

import Listoplane from "../components/Listoplane";
import Shtoplane from "../components/Shtoplane";
import Editplane from "../components/Editplane";
const Planet = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const planiState = useSelector((state) => state.planiState);
  const { plane } = planiState;

  const [selectedPlane, setSelectedPlane] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [changePass, setChangePass] = useState(false);
  const programiState = useSelector((state) => state.programiState);
  const { programe } = programiState;
 
  const [plani, setPlani] = useState({
    emertimi: "",
    id: null,
    departamenti: null,
    created: null,
    updated: null,
  });

  useEffect(() => {
    console.log("effect plani");

   

    dispatch(getPrograme);
  }, [dispatch]);

  const handleEdit = (id) => {
    const [usertoedit] = plane.filter(
      (njeperdorues) => njeperdorues.id === id
    );
    //console.log(usertoedit);

    setSelectedPlane(usertoedit);
    setIsEditing(true);
  };



  const handleDelete = (id) => {
    if (window.confirm("Jeni te sigurte?")) {
      dispatch(deletePlani(id));
    }
  };

  return (
    <div>
      {planiState.getPlaniStatus === "rejected" ||
      planiState.deletePlaniStatus === "rejected" ||
     
      programiState.getProgrameStatus === "rejected" ? (
        <Alert variant="danger">
          {planiState.getPlaniError ||
           
           
            programiState.getProgrameError}
        </Alert>
      ) : null}
     
      {planiState.getPlaniStatus === "pending" ||
     
      programiState.getProgrameStatus === "pending" ||
      planiState.deletePlaniStatus === "pending" ? (
        <Loading center />
      ) : (
        <>
          {!isAdding && !isEditing && !changePass && (
            <>
              <Listoplane
                plane={plane}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                
                setIsAdding={setIsAdding}
              />
            </>
          )}
          {/* Add */}
          {isAdding && (
            <Shtoplane  plane={plane} setIsAdding={setIsAdding} />
          )}

         
          {/* Edit */}
          {isEditing && (
            <Editplane
              plane={plane}
              selectedPlane={selectedPlane}
              setIsEditing={setIsEditing}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Planet;
