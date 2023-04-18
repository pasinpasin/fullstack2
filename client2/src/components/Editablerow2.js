import React, { useState } from "react";
import Wrapper from "../assets/wrappers/Tabela";
const EditableRow2 = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
  handleEditFormSubmit,
}) => {
  return (
    <tr>
      <td className="classname" key="RLenda" data-label="Lenda">
        <input
          type="text"
          required="required"
          placeholder="lenda..."
          name="lenda"
          value={editFormData.renditja}
          onChange={handleEditFormChange}
        ></input>
      </td>

      <td
        className="classname"
        // width="10%"

        key="emertimi"
        data-label="Emertimi"
      >
        <input
          type="text"
          required="required"
          placeholder="emertimi..."
          name="emertimi"
          value={editFormData.emertimi}
          onChange={handleEditFormChange}
        ></input>
      </td>

      <td>
        <button type="submit" onClick={handleEditFormSubmit}>
          Save
        </button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow2;
