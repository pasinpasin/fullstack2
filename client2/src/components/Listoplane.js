import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/Tabela";
import Loading from "./Loading";
import Alert from "./Alert";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { deletePlani, getPlane } from "../features/planetSlice";
import { useParams } from "react-router-dom";
const Listoplane = ({ plane,
  handleEdit,
  handleDelete,
  setIsAdding,
   }) => {
  const dispatch = useDispatch();
  const planiState = useSelector((state) => state.planiState);
  const { id } = useParams();
  
  console.log(plane);

  const columnsData = [
    { field: "plani.emertimi", header: "Programi" },
    { field: "periudha", header: "Periudha" },
    { field: "cikli", header: "Cikli" },
    { field: "status", header: "Status" },
    { field: "fakulteti", header: "Fakulteti" },
    { field: "departamenti", header: "Departamenti" },
    { field: "veprimet", header: "Veprimet" },
  ];

  useEffect(() => {
    console.log("effect plani");

    dispatch(getPlane(id));
  }, [dispatch, id]);


  let url = "/plani/id/planpermbajtja";

  return (
    <Wrapper>
       <div style={{ marginTop: "30px", marginBottom: "18px" }}>
          <button onClick={() => setIsAdding(true)} className="round-button">
            Shto user
          </button>
          </div>
     
       
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
            {plane.length > 0 ? (
              plane.map((data) => (
                <tr key={data.id}>
                 <td key="Programi" data-label="Programi">
                        <Link to={`/kot`}> {data.programi.emertimi}</Link>
                      </td>
                      <td key="Periudha" data-label="Periudha">
                        <Link to={`/kot`}> {data.periudha}</Link>
                      </td>
                      <td key="Cikli" data-label="Cikli">
                        <Link to={`/kot`}> {data.cikli}</Link>
                      </td>
                      <td key="status" data-label="status">
                        <Link to={`/kot`}> {data.status}</Link>
                      </td>

                      <td key="Fakulteti" data-label="Fakulteti">
                        <Link to={`/kot`}>
                          {" "}
                          {data.programi.departamenti.fakulteti.emertimi}
                        </Link>
                      </td>
                      <td key="Departamenti" data-label="Departamenti">
                        <Link to={`/kot`}>
                          {" "}
                          {data.programi.departamenti.emertimi}
                        </Link>
                      </td>

                  <td data-label="Veprimet">
                  <button
                        onClick={() => handleEdit(data.id)}
                        className="button muted-button"
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
       
    
    </Wrapper>
  );
};
export default Listoplane;
