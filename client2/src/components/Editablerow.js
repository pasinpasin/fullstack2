import React, { useState } from "react";
import Wrapper from "../assets/wrappers/Tabela";
const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
  handleEditFormSubmit,
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
          value={editFormData.renditja}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td className="classname" key="Titullari" data-label="Titullari">
        <input
          type="text"
          placeholder="titullari..."
          name="titullari"
          value={editFormData.titullari}
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
      <td key="tipi12" data-label="Tipi">
        <select
          name="tipi"
          value={editFormData.tipi}
          onChange={handleEditFormChange}
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
          value={editFormData.kredite}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td key="nrjave1" data-label="Nrjave Sem 1">
        <input
          type="text"
          placeholder="nrjavesem1..."
          name="nrjavesem1"
          value={editFormData.nrjavesem1}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td className="classname" key="leksione" data-label="Leksione Sem 1">
        <input
          type="text"
          placeholder="leksionesem1"
          name="leksionesem1"
          value={editFormData.leksionesem1}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td className="classname" key="seminare" data-label="Seminare Sem 1">
        <input
          type="number"
          placeholder="seminaresem1.."
          name="seminaresem1"
          value={editFormData.seminaresem1}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td className="classname" key="laboratore" data-label="Laboratore Sem 1">
        <input
          type="text"
          placeholder="laboratoresem1"
          name="laboratoresem1"
          value={editFormData.laboratoresem1}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td className="classname" key="praktika" data-label="Praktika Sem 1">
        <input
          type="text"
          placeholder="praktikasem1"
          name="praktikasem1"
          value={editFormData.praktikasem1}
          onChange={handleEditFormChange}
        ></input>
      </td>
     

      <td className="classname" key="nrjave2" data-label="Nrjave Sem 2">
        <input
          type="text"
          placeholder="nrjavesem2..."
          name="nrjavesem2"
          value={editFormData.nrjavesem2}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td className="classname" key="leksione2" data-label="Leksione Sem 2">
        <input
          type="text"
          placeholder="leksionesem2"
          name="leksionesem2"
          value={editFormData.leksionesem2}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td className="classname" key="seminare2" data-label="Seminare Sem 2">
        <input
          type="text"
          placeholder="seminaresem2.."
          name="seminaresem2"
          value={editFormData.seminaresem2}
          onChange={handleEditFormChange}
        ></input>
      </td>
     
      <td className="classname" key="laboratore2" data-label="Laboratore Sem 2">
        <input
          type="text"
          placeholder="laboratoresem2"
          name="laboratoresem2"
          value={editFormData.laboratoresem2}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td className="classname" key="praktika2" data-label="Praktika Sem 2">
        <input
          type="text"
          placeholder="praktikasem2"
          name="praktikasem2"
          value={editFormData.praktikasem2}
          onChange={handleEditFormChange}
        ></input>
      </td>
   
      <td>
        <input
          type="text"
          placeholder="sem 1"
          name="semestri1"
          value={editFormData.semestri1}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          placeholder="sem 2"
          name="semestri2"
          value={editFormData.semestri2}
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

export default EditableRow;
