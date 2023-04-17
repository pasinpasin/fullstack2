import React, { useState } from "react";

const Addrow = ({ 
  addFormData,
  handleAddFormChange,
  handleCancelClick,
  handleAddFormSubmit,
}) => {
  return (
    <tr>
      <td  key="Renditja" data-label="Renditja">
        <input
          type="text"
          required="required"
          placeholder="renditja..."
          name="renditja"
          value={addFormData.renditja}
          onChange={handleAddFormChange}
        ></input>
      </td>
      <td  key="Titullari" data-label="Titullari">
        <input
          type="text"
          placeholder="titullari..."
          name="titullari"
          value={addFormData.titullari}
          onChange={handleAddFormChange}
        ></input>
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
      <td  key="tipi" data-label="Tipi">
        <input
          type="text"
          required="required"
          placeholder="tipi..."
          name="tipi"
          value={addFormData.tipi}
          onChange={handleAddFormChange}
        ></input>
      </td>
      <td  key="kredite" data-label="Kredite">
        <input
          type="text"
          required="required"
          placeholder="kredite..."
          name="kredite"
          value={addFormData.kredite}
          onChange={handleAddFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          placeholder="nrjavesem1..."
          name="nrjavesem1"
          value={addFormData.nrjavesem1}
          onChange={handleAddFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          name="seminaresem1"
          placeholder="seminaresem1.."
          value={addFormData.seminaresem1}
          onChange={handleAddFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          placeholder="leksionesem1"
          name="leksionesem1"
          value={addFormData.leksionesem1}
          onChange={handleAddFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          placeholder="praktikasem1"
          name="praktikasem1"
          value={addFormData.praktikasem1}
          onChange={handleAddFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          placeholder="laboratoresem1"
          name="labortoresem1"
          value={addFormData.laboratoresem1}
          onChange={handleAddFormChange}
        ></input>
      </td>

      <td>
        <input
          type="text"
          placeholder="nrjavesem2..."
          name="nrjavesem2"
          value={addFormData.nrjavesem2}
          onChange={handleAddFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          placeholder="seminaresem2.."
          name="seminaresem2"
          value={addFormData.seminaresem2}
          onChange={handleAddFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          placeholder="leksionesem2"
          name="leksionesem2"
          value={addFormData.leksionesem2}
          onChange={handleAddFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          placeholder="praktikasem2"
          name="praktikasem2"
          value={addFormData.praktikasem2}
          onChange={handleAddFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          placeholder="laboratoresem2"
          name="laboratoresem2"
          value={addFormData.laboratoresem2}
          onChange={handleAddFormChange}
        ></input>
      </td>

      <td>
        <button type="submit"onClick={handleAddFormSubmit}>Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default Addrow;
