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
  changeUserPassword,
  deleteUser,
  getUser,
  updateUser,
} from "../features/userSlice";
import { getFakultete } from "../features/fakultetiSlice";
import { getDepartamente } from "../features/departamentiSlice";
import Changepassbyadmin from "../components/Changepassbyadmin";
const Users = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userState);
  const { perdorues } = userState;

  const [selectedPerdorues, setSelectedPerdorues] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [changePass, setChangePass] = useState(false);
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
    //console.log(usertoedit);

    setSelectedPerdorues(usertoedit);
    setIsEditing(true);
  };

  const handlePassword = (data) => {
    //  const [usertoedit] = perdorues.filter(
    //  (njeperdorues) => njeperdorues.id === id
    //);
    //console.log(usertoedit);

    // setSelectedPerdorues(usertoedit);
    //setChangePass(true);

    dispatch(changeUserPassword(data.user.email))
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res.code === 200) setChangePass(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Jeni te sigurte?")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div>
      {userState.getUserStatus === "rejected" ||
      userState.deleteUserStatus === "rejected" ||
      userState.changeUserPasswordStatus === "rejected" ||
      fakultetiState.getFakulteteStatus === "rejected" ||
      departamentiState.getDepartamenteStatus === "rejected" ? (
        <Alert variant="danger">
          {userState.getUserError ||
            userState.changeUserPasswordError ||
            departamentiState.getDepartamenteError ||
            fakultetiState.getFakulteteError}
        </Alert>
      ) : null}
      {userState.changeUserPasswordStatus === "success" ? (
        <Alert variant="success">Passwordi u ndryshua</Alert>
      ) : null}
      {userState.getUserStatus === "pending" ||
      userState.changeUserPasswordStatus === "pending" ||
      fakultetiState.getFakulteteStatus === "pending" ||
      departamentiState.getDepartamenteStatus === "pending" ||
      userState.deleteUserStatus === "pending" ? (
        <Loading center />
      ) : (
        <>
          {!isAdding && !isEditing && !changePass && (
            <>
              <Listouser
                perdorues={perdorues}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handlePassword={handlePassword}
                setIsAdding={setIsAdding}
              />
            </>
          )}
          {/* Add */}
          {isAdding && (
            <Shtouser perdorues={perdorues} setIsAdding={setIsAdding} />
          )}

          {changePass && (
            <Changepassbyadmin
              perdorues={perdorues}
              selectedUser={selectedPerdorues}
              setChangePass={setChangePass}
            />
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
