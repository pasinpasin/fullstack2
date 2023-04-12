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
import { deleteUser, getUser, updateUser } from "../features/userSlice";
import { getFakultete } from "../features/fakultetiSlice";
import { getDepartamente } from "../features/departamentiSlice";
const Users = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userState);
  const { perdorues } = userState;

  const [selectedPerdorues, setSelectedPerdorues] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const departamentiState = useSelector((state) => state.departamentiState);
  const { departamente } = departamentiState;
  const fakultetiState = useSelector((state) => state.fakultetiState);
  const { fakultete } = fakultetiState;
  const [user, setUser] = useState({
    emertimi: "",
    id: null,
    departamenti: null,
    created: null,
    updated: null,
  });

  useEffect(() => {
    console.log("effect user");

    dispatch(getUser());
    dispatch(getFakultete());

    dispatch(getDepartamente());
  }, [dispatch]);

  const handleEdit = (id) => {
    const [usertoedit] = perdorues.filter(
      (njeperdorues) => njeperdorues.id === id
    );
    console.log(usertoedit);

    setSelectedPerdorues(usertoedit);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Jeni te sigurte?")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div>
      {userState.getUserStatus === "rejected" ||
      fakultetiState.getFakulteteStatus === "rejected" ||
      departamentiState.getDepartamenteStatus === "rejected" ? (
        <Alert variant="danger">
          {userState.getUserError ||
            departamentiState.getDepartamenteError ||
            fakultetiState.getFakulteteError}
        </Alert>
      ) : null}
      {userState.getUserStatus === "pending" ||
      fakultetiState.getFakulteteStatus === "pending" ||
      departamentiState.getDepartamenteStatus === "pending" ||
      userState.deleteUserStatus === "pending" ? (
        <Loading center />
      ) : (
        <>
          {!isAdding && !isEditing && (
            <>
              <Listouser
                perdorues={perdorues}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                setIsAdding={setIsAdding}
              />
            </>
          )}
          {/* Add */}
          {isAdding && (
            <Shtouser perdorues={perdorues} setIsAdding={setIsAdding} />
          )}
          {/* Edit */}
          {isEditing && (
            <Edituser
              perdorues={perdorues}
              selectedUser={selectedPerdorues}
              setIsEditing={setIsEditing}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Users;
