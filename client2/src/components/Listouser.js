import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/Tabela";
import Loading from "./Loading";
import Alert from "./Alert";

import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { useParams } from "react-router-dom";
import { deleteUser, getUser } from "../features/userSlice";
const Listouser = ({ setUser }) => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userState);
  const { id } = useParams();
  const { perdorues } = userState;
  console.log(perdorues);

  const columnsData = [
    { field: "user.first_name", header: "Emri" },
    { field: "user.last_name", header: "Mbiemri" },
    { field: "atesia", header: "Atesia" },
    { field: "user.email", header: "Email" },
    { field: "titulli", header: "Titulli" },
    { field: "roli", header: "Roli" },
    { field: "departamenti.fakulteti.emertimi", header: "Fakulteti" },
    { field: "departamenti.emertimi", header: "Departamenti" },
  ];
  useEffect(() => {
    console.log("effect user");

    dispatch(getUser());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Jeni te sigurte?")) {
      dispatch(deleteUser(id));
    }
  };
  let url = "/departamenti/id/programi";

  return (
    <Wrapper>
      {userState.getUserStatus === "rejected" ? (
        <Alert variant="danger">{userState.getUserError}</Alert>
      ) : null}
      {userState.getUserStatus === "pending" || userState.deleteUserStatus === "pending"  ? (
        <Loading center />
      ) : 
     
      (
       <>
        <Link to={`/users/shtouser`}>
        <button className="btn  ">Shto user</button>
      </Link>
        
        <table>
        <thead>
          <tr key="kolonat">
            {columnsData.map((column) => (
              <th key={column.field}> {column.header}</th>
            ))}

            <th key="veprimet">Veprimet</th>
          </tr>
        </thead>
        <tbody>
          {perdorues.map((data) => (
            <tr key={data.id}>
             
              <td key="Emri" data-label="Emri">
                {data.user.first_name}
              </td>
              <td key="Mbiemri" data-label="Mbiemri">
                {data.user.last_name}
              </td>
              <td key="Atesia" data-label="Atesia">
                {data.atesia}
              </td>
              <td key="Email" data-label="Email">
                {data.user.email}
              </td>
              <td key="Titulli" data-label="itulli">
                {data.titulli}
              </td>
              <td key="Roli" data-label="Roli">
                {data.roli.join(" ")}
              </td>
              <td key="Fakulteti" data-label="Fakulteti">
                {data.departamenti.fakulteti.emertimi}
              </td>
              <td key="Departamenti" data-label="Departamenti">
                {data.departamenti.emertimi}
              </td>

              {
                <td data-label="Veprimet">
               <Link to={`/users/${data.id}/edit`}>
                            <FaEdit size={25} />
                          </Link>
              
                <MdDelete
                            size={25}
                            onClick={() => handleDelete(data.id)}
                          />
              </td>
              }
            </tr>
          ) ) }
        </tbody>
      </table>
      </> ) }
    </Wrapper>
  );
};
export default Listouser;
