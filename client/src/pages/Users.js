import { useAppContext } from "../context/appContext";
import useHttpClient from "../hooks/useHttpClient";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import Alert from "../components/Alert2";
import Wrapper from "../assets/wrappers/Tabela";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import Tabela from "../components/Tabela2";

function GetPropertyValue(obj1, dataToRetrieve) {
  return dataToRetrieve.split(".").reduce(function (o, k) {
    console.log(o[k]);
    return o && o[k]; // get inner property if `o` is defined else get `o` and return
  }, obj1); // set initial value as object
}
const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const { user } = useAppContext();

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

  const [users2, setUsers2] = useState();
  const ModifikoData = async () => {
    try {
      const bodytosend = {};

      const response = await sendRequest(
        "/users",
        "PATCH",
        bodytosend,
        "PERDITESO_PEDAGOG"
      );
    } catch (error) {
      console.log(error);
    }

    getData();
  };

  const fshijUser = async (id) => {
    if (window.confirm("Jeni te sigurte?")) {
      try {
        const response = await sendRequest(`/users/${id}`, "DELETE", {});
      } catch (error) {
        console.log(error);
      }
      getData();
    }
  };

  const getData = async () => {
    try {
      const response = await sendRequest(`users`, "GET", {});
      console.log(response.data.result.items);
      setUsers2(response.data.result.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  let url = "/";

  return (
    <Wrapper>
      {isLoading ? (
        <Loading center />
      ) : (
        <div>
          {error.alertType !== "" ?? (
            <Alert alertType={error.alertType} alertText={error.alertText} />
          )}
          {users2 && users2.length > 0 ? (
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
                  {users2.map((data) => (
                    <tr key={data.id}>
                      {/*   {columnsData.map((data3) => (
                        <td key={data3.header} data-label={data3.header}>
                          {GetPropertyValue(data, data3.field)}
                        </td>
                      ))} */}
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
                        <td key="veprimet" data-label="Veprimet">
                          <Link to={`/users/${data.id}/edit`}>
                            <FaEdit size={25} />
                          </Link>
                          <MdDelete
                            size={25}
                            onClick={() => fshijUser(data.id)}
                          />
                        </td>
                      }
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            "S ka user"
          )}
        </div>
      )}
    </Wrapper>
  );
};

export default Users;
