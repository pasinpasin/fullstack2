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

const Listouser = ({ perdorues, handleEdit, handleDelete, setIsAdding }) => {
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

  let url = "/departamenti/id/programi";

  return (
    <Wrapper>
      <>
        <div style={{ marginTop: "30px", marginBottom: "18px" }}>
          <button onClick={() => setIsAdding(true)} className="round-button">
            Shto user
          </button>
        </div>
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
            {perdorues.length > 0 ? (
              perdorues.map((data) => (
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
                      <button
                        onClick={() => handleEdit(data.id)}
                        className="button muted-button"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(data.id)}
                        className="button muted-button"
                      >
                        Delete
                      </button>
                    </td>
                  }
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>No Employees</td>
              </tr>
            )}
          </tbody>
        </table>
      </>
    </Wrapper>
  );
};
export default Listouser;
