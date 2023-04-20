import React from "react";
import Wrapper from "../assets/wrappers/Tabela";
const Readonlyrow = ({ mydata, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td className="classname" key="Renditja" data-label="Renditja">
        {mydata.renditja}
      </td>
      <td className="classname" key="Titullari" data-label="Titullari">
        {mydata.titullari}
      </td>
      <td
        className="classname"
        // width="10%"

        key="emertimi"
        data-label="Emertimi"
      >
        {mydata.emertimi}
      </td>
      <td className="classname" key="tipi" data-label="Tipi">
        {mydata.tipiveprimtarise}
      </td>
      <td className="classname" key="kredite" data-label="Kredite">
        {mydata.kredite}
      </td>
      <td className="classname" key="nrjave1" data-label="Nrjave Sem 1">
        {mydata.nrjavesem1}
      </td>
      <td className="classname" key="leksione" data-label="Leksione Sem 1">
        {mydata.leksionesem1}
      </td>
      <td className="classname" key="seminare" data-label="Seminare Sem 1">
        {mydata.seminaresem1}
      </td>
      <td className="classname" key="laboratore" data-label="Laboratore Sem 1">
        {mydata.laboratoresem1}
      </td>
      <td className="classname" key="praktika" data-label="Praktika Sem 1">
        {mydata.praktikasem1}
      </td>

      <td className="classname" key="nrjave2" data-label="Nrjave Sem 2">
        {mydata.nrjavesem2}
      </td>
      <td className="classname" key="leksione2" data-label="Leksione Sem 2">
        {mydata.leksionesem2}
      </td>
      <td className="classname" key="seminare2" data-label="Seminare Sem 2">
        {mydata.seminaresem2}
      </td>
      <td className="classname" key="laboratore2" data-label="Laboratore Sem 2">
        {mydata.laboratoresem2}
      </td>
      <td className="classname" key="praktika2" data-label="Praktika Sem 2">
        {mydata.praktikasem2}
      </td>

      <td className="classname" key="totleks" data-label="Tot Leks">
        {mydata.totleksione}
      </td>
      <td className="classname" key="totsem" data-label="Tot Sem">
        {mydata.totseminare}
      </td>
      <td className="classname" key="totlab" data-label="Tot Lab">
        {mydata.totseminare}
      </td>
      <td className="classname" key="totprak" data-label="Tot Prakt">
        {mydata.totpraktika}
      </td>
      <td className="classname" key="jaudit" data-label="Ore jashte audit">
        {}
      </td>
      <td className="classname" key="sem1" data-label="Sem 1">
        {mydata.semestri1}
      </td>
      <td className="classname" key="sem2" data-label="Sem 2">
        {mydata.semestri2}
      </td>

      <td className="classname">
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

export default Readonlyrow;
