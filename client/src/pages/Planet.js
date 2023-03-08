import { useAppContext } from "../context/appContext";
import useHttpClient from "../hooks/useHttpClient";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import Alert2 from "../components/Alert2";
import TD from "../components/TD";
import Wrapper from "../assets/wrappers/Tabela";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FaEdit, FaEye } from "react-icons/fa";
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
    { field: "fakulteti", header: "Fakulteti" },
    { field: "departamenti", header: "Departamenti" },
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
      const response = await sendRequest(
        id != null ? `programi/${id}/plani/` : "plani",
        "GET",
        {}
      );
      if (id != null) {
        setprogramiperket(id);
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
            <Alert2 alertType={error.alertType} alertText={error.alertText} />
          )}
          {data && data.length > 0 ? (
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
                  {data.map((mydata) => (
                    <tr key={mydata.id}>
                      <td key="Programi" data-label="Programi">
                        <Link to={`/kot`}> {mydata.programi.emertimi}</Link>
                      </td>
                      <td key="Periudha" data-label="Periudha">
                        <Link to={`/kot`}> {mydata.periudha}</Link>
                      </td>
                      <td key="Cikli" data-label="Cikli">
                        <Link to={`/kot`}> {mydata.cikli}</Link>
                      </td>
                      <td key="status" data-label="status">
                        <Link to={`/kot`}> {mydata.status}</Link>
                      </td>

                      <td key="Fakulteti" data-label="Fakulteti">
                        <Link to={`/kot`}>
                          {" "}
                          {mydata.programi.departamenti.fakulteti.emertimi}
                        </Link>
                      </td>
                      <td key="Departamenti" data-label="Departamenti">
                        <Link to={`/kot`}>
                          {" "}
                          {mydata.programi.departamenti.emertimi}
                        </Link>
                      </td>

                      {
                        <td key="veprimet" data-label="Veprimet">
                          <Link to={`/users/${mydata.id}/edit`}>
                            <FaEdit size={25} />
                          </Link>
                          <MdDelete
                            size={25}
                            onClick={() => fshij(mydata.id)}
                          />
                          <Link to={`/plani/${mydata.id}/`} title="Shiko">
                            <FaEye size={25} />
                          </Link>
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
