import React, { useState } from "react";
import FormrowSelect from "./FormrowSelect";

const Addrow2 = ({
  addFormData,
  handleAddFormChange,
  handleCancelClick,
  handleAddFormSubmit,
  listelendesh,
}) => {
  const [lende, setLende] = useState();
  return (
    <tr>
      <td key="Lenda" data-label="Lenda">
        <FormrowSelect
          name="emertimi"
          handleChange={(e) => {
            console.log(e.target.value);
            setLende(e.target.value);
          }}
          lista={listelendesh}
          //lista={setFilter(departamentet)}
        />
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
          value={addFormData.emertimi}
          onChange={handleAddFormChange}
        ></input>
      </td>

      <td>
        <button type="submit" onClick={handleAddFormSubmit}>
          Save
        </button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default Addrow2;
