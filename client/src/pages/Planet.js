import { useAppContext } from "../context/appContext";
import useHttpClient from "../hooks/useHttpClient";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import Alert2 from "../components/Alert2";
import Wrapper from "../assets/wrappers/Tabela";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useParams } from "react-router-dom";

const Planet = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { id } = useParams();
  const { user } = useAppContext();

  const columnsData = [
    { field: "programi.emertimi", header: "Programi" },
    { field: "periudha", header: "Periudha" },
    { field: "cikli", header: "Cikli" },
    { field: "status", header: "Status" },
  ];

  const [periudha, setPeriudha] = useState("");
  const [cikli, setCikli] = useState("");
  const [status, setStatus] = useState("");
  const [columns, setColumns] = useState(columnsData);
  const [editing, setEditing] = useState(false);

  const [data, setData] = useState();

  const [programiperket, setprogramiperket] = useState("");
  console.log(programiperket);
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

  const fshij = async (id) => {
    if (window.confirm("Jeni te sigurte?")) {
      try {
        const response = await sendRequest(`/plani/${id}`, "DELETE", {});
        getData();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getData = async () => {
    try {
      console.log(Object.keys(id).length);
      const response = await sendRequest(
        Object.keys(id).length > 0 ? `programi/${id}/plani/` : "plani",
        "GET",
        {}
      );
      if (Object.keys(id).length > 0) {
        setprogramiperket(`${id}`);
      }
      setData(response.data.result.items);

      //console.log(data);
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

export default Planet;
