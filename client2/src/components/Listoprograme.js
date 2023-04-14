import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/Tabela";
import Loading from "./Loading";
import Alert from "./Alert";
import { NavLink } from "react-router-dom";
import { deleteProgrami, getPrograme } from "../features/programiSlice";
import { useParams } from "react-router-dom";
const Listoprograme = ({ setProgrami }) => {
  const dispatch = useDispatch();
  const programiState = useSelector((state) => state.programiState);
  const { id } = useParams();
  const { programe } = programiState;
  console.log(programe);

  const columnsData = [
    { field: "fakulteti", header: "Fakulteti" },
    { field: "departamenti", header: "Departamenti" },
    { field: "emertimi", header: "Programi" },
    { field: "veprimet", header: "Veprimet" },
  ];
  useEffect(() => {
    console.log("effect departamenti");

    dispatch(getPrograme(id));
  }, [dispatch, id]);

  const handleDelete = (id) => {
    if (window.confirm("Jeni te sigurte?")) {
      dispatch(deleteProgrami(id));
    }
  };
  let url = "/programi/id/planet";

  return (
    <Wrapper>
      {programiState.getProgrameStatus === "rejected" ? (
        <Alert variant="danger">{programiState.getProgrameError}</Alert>
      ) : null}
      {programiState.getProgrameStatus === "pending" ? (
        <Loading center />
      ) : (
        <table>
          <thead>
            <tr>
              {columnsData.length > 0 ? (
                columnsData.map((column) => (
                  <th key={column.field}> {column.header}</th>
                ))
              ) : (
                <th colSpan={3}>Nuk ka te dhena per kolonat</th>
              )}
            </tr>
          </thead>
          <tbody>
            {programe.length > 0 ? (
              programe.map((data) => (
                <tr key={data.id}>
                  <td data-label={columnsData[0].header}>
                    {data.departamenti.fakulteti.emertimi}
                  </td>
                  <td data-label={columnsData[1].header}>
                    {data.departamenti.emertimi}
                  </td>
                  <td data-label={columnsData[2].header}>
                    <NavLink
                      to={url.replace("id", data.id)}
                      // onClick={props.functioncall}
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                      end
                    >
                      {data.emertimi}
                    </NavLink>
                  </td>

                  <td data-label="Veprimet">
                    <button
                      size="small"
                      className="btn  "
                      onClick={() =>
                        setProgrami({
                          id: data.id,
                          emertimi: data.emertimi,
                          departamenti: data.departamenti.id,
                          fakulteti: data.departamenti.fakulteti.id,

                          created: null,
                          updated: null,
                        })
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="btn "
                      onClick={() => handleDelete(data.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>Nuk ka te dhena</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </Wrapper>
  );
};
export default Listoprograme;
