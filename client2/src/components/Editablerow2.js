const EditableRow2 = ({
  editFormData2,
  handleEditFormChange2,
  handleCancelClick2,
  handleEditFormSubmit2,
  listelendesh,
}) => {
  return (
    <tr>
      <td>
        <select
          name="lenda"
          value={editFormData2.lenda}
          onChange={handleEditFormChange2}
          className="form-select"
        >
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
          value={editFormData2.emertimi}
          onChange={handleEditFormChange2}
        ></input>
      </td>

      <td>
        <button type="submit" onClick={handleEditFormSubmit2}>
          Save
        </button>
        <button type="button" onClick={handleCancelClick2}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow2;
