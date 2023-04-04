import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteFakulteti, getFakultete } from "../features/fakultetiSlice";
import Wrapper from "../assets/wrappers/Tabela";
import Loading from "../components/Loading";
import Alert from "../components/Alert";
import { NavLink } from "react-router-dom";

const ListoFakultete = ({ setFakulteti }) => {
  const dispatch = useDispatch();
  const fakultetiState = useSelector((state) => state.fakultetiState);
  const { fakultete } = fakultetiState;
  const columnsData = [
    { field: "emertimi", header: "Fakulteti" },
    { field: "veprimet", header: "Veprimet" },
  ];
  useEffect(() => {
    console.log("effect fakultete");
    dispatch(getFakultete());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Jeni te sigurte?")) {
      dispatch(deleteFakulteti(id));
    }
  };
  let url = "/fakulteti/id/departamenti";

  return (
    <Wrapper>
      {fakultetiState.getFakulteteStatus === "rejected" ? (
        <Alert variant="danger">{fakultetiState.getFakulteteError}</Alert>
      ) : null}
      {fakultetiState.getFakulteteStatus === "pending" ? (
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
            {fakultete.length > 0 ? (
              fakultete.map((data) => (
                <tr key={data.id}>
                  <td data-label={columnsData[0].header}>
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
                      onClick={() => setFakulteti({ ...data })}
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
export default ListoFakultete;
