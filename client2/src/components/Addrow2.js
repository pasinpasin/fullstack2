import React, { useState } from "react";

const Addrow2 = ({
  addFormData2,
  handleAddFormChange2,
  handleCancelClick2,
  handleAddFormSubmit2,
  listelendesh,
}) => {
  return (
    <tr>
      <td key="Lenda" data-label="Lenda">
        <select
          name="lenda"
          value={addFormData2.lenda}
          onChange={handleAddFormChange2}
          className="form-select"
        >
          <option disabled hidden value="">
            --Zgjedh--
          </option>
          {listelendesh.map((itemValue) => {
            return (
              <option
                key={itemValue.id || itemValue}
                value={itemValue.id || itemValue}
                data-celesi={itemValue.id || itemValue}
              >
                {itemValue.emertimi || itemValue}
              </option>
            );
          })}
        </select>
      </td>

      <td
        // width="10%"

        key="emertimi"
        data-label="Emertimi"
      >
        <input
          type="text"
          required="required"
          placeholder="emertimi..."
          name="emertimi"
          value={addFormData2.emertimi}
          onChange={handleAddFormChange2}
        ></input>
      </td>

      <td>
        <button type="submit" onClick={handleAddFormSubmit2}>
          Save
        </button>
        <button type="button" onClick={handleCancelClick2}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default Addrow2;
