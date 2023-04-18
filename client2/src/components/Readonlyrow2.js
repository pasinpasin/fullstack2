import React from "react";
import Wrapper from "../assets/wrappers/Tabela";
const Readonlyrow2 = ({ mydata, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td key="Lenda" data-label="Lenda">
        {mydata.lenda}
      </td>

      <td
        // width="10%"

        key="emertimi"
        data-label="Emertimi"
      >
        {mydata.emertimi}
      </td>
      <td key="tipi" data-label="Tipi">
        {mydata.tipiveprimtarise}
      </td>

      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, mydata)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(mydata.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Readonlyrow2;
