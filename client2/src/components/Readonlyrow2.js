import React from "react";

const Readonlyrow2 = ({ mydata2, handleEditClick2, handleDeleteClick2 }) => {
  console.log(mydata2);
  return (
    <tr>
      <td key="Lenda2" data-label="Lenda">
        {mydata2.lenda.emertimi}
      </td>

      <td
        // width="10%"

        key="emertimi2"
        data-label="Emertimi"
      >
        {mydata2.emertimi}
      </td>

      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick2(event, mydata2)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick2(mydata2.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Readonlyrow2;
