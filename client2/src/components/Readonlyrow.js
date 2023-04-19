import React from "react";
import Wrapper from "../assets/wrappers/Tabela";
const Readonlyrow = ({ mydata, handleEditClick, handleDeleteClick }) => {
  
  return (
  
    <tr>
      <td  key="Renditja" data-label="Renditja">
        {mydata.renditja}
      </td>
      <td  key="Titullari" data-label="Titullari">
        {mydata.titullari}
      </td>
      <td
        // width="10%"
        
        key="emertimi"
        data-label="Emertimi"
      >
        {mydata.emertimi}
      </td>
      <td  key="tipi" data-label="Tipi">
        {mydata.tipiveprimtarise}
      </td>
      <td  key="kredite" data-label="Kredite">
        {mydata.kredite}
      </td>
      <td  key="nrjave1" data-label="Nrjave Sem 1">
        {mydata.nrjavesem1}
      </td>
      <td  key="leksione" data-label="Leksione Sem 1">
        {mydata.leksionesem1}
      </td>
      <td  key="seminare" data-label="Seminare Sem 1">
        {mydata.seminaresem1}
      </td>
      <td  key="laboratore" data-label="Laboratore Sem 1">
        {mydata.laboratoresem1}
      </td>
      <td  key="praktika" data-label="Praktika Sem 1">
        {mydata.praktikasem1}
      </td>
     
      <td  key="nrjave2" data-label="Nrjave Sem 2">
        {mydata.nrjavesem2}
      </td>
      <td  key="leksione2" data-label="Leksione Sem 2">
        {mydata.leksionesem2}
      </td>
      <td  key="seminare2" data-label="Seminare Sem 2">
        {mydata.seminaresem2}
      </td>
      <td  key="laboratore2" data-label="Laboratore Sem 2">
        {mydata.laboratoresem2}
      </td>
      <td  key="praktika2" data-label="Praktika Sem 2">
        {mydata.praktikasem2}
      </td>
      
      <td  key="totleks" data-label="Tot Leks">
        {mydata.totleksione}
      </td>
      <td  key="totsem" data-label="Tot Sem">
        {mydata.totseminare}
      </td>
      <td key="totlab" data-label="Tot Lab">
        {mydata.totseminare}
      </td>
      <td  key="totprak" data-label="Tot Prakt">
        {mydata.totpraktika}
      </td>
      <td  key="jaudit" data-label="Ore jashte audit">
        {}
      </td>
      <td key="sem1" data-label="Sem 1">
        {mydata.semestri1}
      </td>
      <td  key="sem2" data-label="Sem 2">
        {mydata.semestri2}
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

export default Readonlyrow;
