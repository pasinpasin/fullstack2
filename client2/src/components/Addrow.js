import React, { useState } from "react";

const Addrow = ({
  addFormData,
  handleAddFormChange,
  handleCancelClick,
  handleAddFormSubmit,
}) => {
  const options = [
    { label: "A", value: "A" },
    { label: "B", value: "B" },
    { label: "C", value: "C" },
    { label: "D", value: "D" },
    { label: "E", value: "E" },
    { label: "F", value: "F" },
    { label: "m", value: "m" },
  ];

  return (
    <tr>
      <td className="classname" key="Renditja" data-label="Renditja">
        <input
          type="text"
          required="required"
          placeholder="renditja..."
          name="renditja"
          value={addFormData.renditja}
          onChange={handleAddFormChange}
        ></input>
      </td>
      <td className="classname" key="Titullari" data-label="Titullari">
        <input
          type="text"
          placeholder="titullari..."
          name="titullari"
          value={addFormData.titullari}
          onChange={handleAddFormChange}
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
          value={addFormData.emertimi}
          onChange={handleAddFormChange}
        ></input>
      </td>
      <td className="classname" key="tipi12" data-label="Tipi">
        <select
          name="tipi"
          value={addFormData.tipi}
          onChange={handleAddFormChange}
        >
          <option disabled hidden value="">
            --Zgjedh--
          </option>
          {options.map((itemValue) => {
            return (
              <option
                key={itemValue.label}
                value={itemValue.value}
                data-celesi={itemValue.value}
              >
                {itemValue.label}
              </option>
            );
          })}
        </select>
      </td>
      <td className="classname" key="kredite" data-label="Kredite">
        <input
          type="text"
          required="required"
          placeholder="kredite..."
          name="kredite"
          value={addFormData.kredite}
          onChange={handleAddFormChange}
        ></input>
      </td>
      <td className="classname">
        <input
          type="text"
          placeholder="nrjavesem1..."
          name="nrjavesem1"
          value={addFormData.nrjavesem1}
          onChange={handleAddFormChange}
        ></input>
      </td>
      <td className="classname">
        <input
          type="text"
          placeholder="leksionesem1"
          name="leksionesem1"
          value={addFormData.leksionesem1}
          onChange={handleAddFormChange}
        ></input>
      </td>
      <td className="classname">
        <input
          type="text"
          name="seminaresem1"
          placeholder="seminaresem1.."
          value={addFormData.seminaresem1}
          onChange={handleAddFormChange}
        ></input>
      </td>
      <td className="classname">
        <input
          type="text"
          placeholder="laboratoresem1"
          name="laboratoresem1"
          value={addFormData.laboratoresem1}
          onChange={handleAddFormChange}
        ></input>
      </td>
      <td className="classname">
        <input
          type="text"
          placeholder="praktikasem1"
          name="praktikasem1"
          value={addFormData.praktikasem1}
          onChange={handleAddFormChange}
        ></input>
      </td>

      <td className="classname">
        <input
          type="text"
          placeholder="nrjavesem2..."
          name="nrjavesem2"
          value={addFormData.nrjavesem2}
          onChange={handleAddFormChange}
        ></input>
      </td>
      <td className="classname">
        <input
          type="text"
          placeholder="leksionesem2"
          name="leksionesem2"
          value={addFormData.leksionesem2}
          onChange={handleAddFormChange}
        ></input>
      </td>
      <td className="classname">
        <input
          type="text"
          placeholder="seminaresem2.."
          name="seminaresem2"
          value={addFormData.seminaresem2}
          onChange={handleAddFormChange}
        ></input>
      </td>

      <td className="classname">
        <input
          type="text"
          placeholder="laboratoresem2"
          name="laboratoresem2"
          value={addFormData.laboratoresem2}
          onChange={handleAddFormChange}
        ></input>
      </td>
      <td className="classname">
        <input
          type="text"
          placeholder="praktikasem2"
          name="praktikasem2"
          value={addFormData.praktikasem2}
          onChange={handleAddFormChange}
        ></input>
      </td>

      <td className="classname">
        <input
          type="text"
          placeholder="sem 1"
          name="semestri1"
          value={addFormData.semestri1}
          onChange={handleAddFormChange}
        ></input>
      </td>
      <td className="classname">
        <input
          type="text"
          placeholder="sem 2"
          name="semestri2"
          value={addFormData.semestri2}
          onChange={handleAddFormChange}
        ></input>
      </td>

      <td className="classname">
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

export default Addrow;
