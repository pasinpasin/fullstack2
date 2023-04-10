import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/Tabela";
import Loading from "./Loading";
import Alert from "./Alert";
import { NavLink } from "react-router-dom";
import { getPedagoget } from "../features/pedagogetSlice";

const Listopedagoge = ({ id }) => {
  const dispatch = useDispatch();
  const pedagogState = useSelector((state) => state.pedagogeState);

  const { pedagoge } = pedagogState;
  //console.log(pedagoge);

  const columnsData = [
    { field: "user.first_name", header: "Emri" },
    { field: "user.last_name", header: "Mbiemri" },
    { field: "titulli", header: "Titulli" },
    { field: "departamenti.fakulteti.emertimi", header: "Fakulteti" },
    { field: "departamenti.emertimi", header: "Departamenti" },
  ];
  useEffect(() => {
    console.log("effect pedagog");

    dispatch(getPedagoget(id));
  }, [dispatch, id]);

  let url = "/departamenti/id/programi";

  return (
    <Wrapper>
      {pedagogState.getPedagogeStatus === "rejected" ? (
        <Alert variant="danger">{pedagogState.getPedagogeError}</Alert>
      ) : null}
      {pedagogState.getPedagogeStatus === "pending" ? (
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
            {pedagoge.length > 0 ? (
              pedagoge.map((data) => (
                <tr key={data.id}>
                  <td data-label={columnsData[0].header}>{data.user.first_name}</td>
                  <td data-label={columnsData[1].header}>
                    <NavLink
                      to={url.replace("id", data.id)}
                      // onClick={props.functioncall}
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                      end
                    >
                      {data.user.last_name}
                    </NavLink>
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
export default Listopedagoge;
