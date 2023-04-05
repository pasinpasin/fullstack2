import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import Wrapper from "../assets/wrappers/Tabela";
import Loading from "../components/Loading";
import Alert from "../components/Alert";
import { NavLink } from "react-router-dom";
import {
  deleteDepartamenti,
  getDepartamente,
} from "../features/departamentiSlice";
import { getDepartamenteNgaFakulteti } from "../features/fakultetiSlice";

const ListoDepartamente = ({ setDepartamenti }) => {
  const dispatch = useDispatch();
  const departamentiState = useSelector((state) => state.departamentiState);
  const fakultetiState = useSelector((state) => state.fakultetiState);
  const { departamentengafakulteti } = fakultetiState;
  const { departamente } = departamentiState;

  const columnsData = [
    { field: "emertimi", header: "Departamenti" },
    { field: "veprimet", header: "Veprimet" },
  ];
  useEffect(() => {
    console.log("effect departamenti");
    dispatch(getDepartamenteNgaFakulteti());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Jeni te sigurte?")) {
      dispatch(deleteDepartamenti(id));
    }
  };
  let url = "/departamenti/id/programi";

  return (
    <Wrapper>
      {departamentiState.getDepartamenteStatus === "rejected" ? (
        <Alert variant="danger">{departamentiState.getDepartamenteError}</Alert>
      ) : null}
      {departamentiState.getDepartamenteStatus === "pending" ? (
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
            {departamente.length > 0 ? (
              departamente.map((data) => (
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
                      onClick={() => setDepartamenti({ ...data })}
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
export default ListoDepartamente;
