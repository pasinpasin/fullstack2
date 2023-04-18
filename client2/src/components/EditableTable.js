import React, { useState } from "react";
import Wrapper from "../assets/wrappers/Tabela";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getPlanpermbajtje,
  shtoPlan,
  updatePlanpermbajtja,
} from "../features/planpermbajtjaSlice";
import EditableRow from "./Editablerow";
import Readonlyrow from "./Readonlyrow";
import Addrow from "./Addrow";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import Alert from "./Alert";

import { deletePlanpermbajtja } from "../features/planpermbajtjaSlice";
function EditableTable({ columnsData, semestridata, viti, planiid }) {
  const dispatch = useDispatch();
  const [contacts, setContacts] = useState([]);
  const planpermbajtjaState = useSelector((state) => state.planpermbajtjaState);
  const { planpermbajtja } = planpermbajtjaState;
  //console.log(planpermbajtja)

  const { id } = useParams();
  useEffect(() => {
    console.log("effect editable table");

    /*  dispatch(getPlanpermbajtje(id))
    .then(data=>setContacts(data.payload.result.items)) */

    setContacts(semestridata);
  }, [semestridata]);

  //setContacts(...contacts,planpermbajtja)

  const [editId, setEditId] = useState(null);

  console.log(contacts);
  const [editFormData, setEditFormData] = useState({
    renditja: "",
    titullari: "",
    emertimi: "",
    tipi: "",
    kredite: "",
    nrjavesem1: "",
    seminaresem1: "",
    leksionesem1: "",
    praktikasem1: "",
    laboratoresem1: "",
    nrjavesem2: "",
    seminaresem2: "",
    leksionesem2: "",
    praktikasem2: "",
    laboratoresem2: "",
  });

  const [addFormData, setAddFormData] = useState([]);

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    //console.log(fieldValue);
    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
    // console.log(editFormData)
  };
  const handleCancelClick = () => {
    setEditId(null);
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === null);

    newContacts.splice(index, 1);

    setContacts(newContacts);
    setAddFormData([]);
  };

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    //console.log(fieldValue);
    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      plani: planiid,
      viti: viti,
      renditja: addFormData.renditja,
      titullari: addFormData.titullari,
      emertimi: addFormData.emertimi,
      tipiveprimtarise: addFormData.tipi,
      kredite: addFormData.kredite,
      nrjavesem1: addFormData.nrjavesem1,
      seminaresem1: addFormData.seminaresem1,
      leksionesem1: addFormData.leksionesem1,
      praktikasem1: addFormData.praktikasem1,
      laboratoresem1: addFormData.laboratoresem1,
      nrjavesem2: addFormData.nrjavesem2,
      seminaresem2: addFormData.seminaresem2,
      leksionesem2: addFormData.leksionesem2,
      praktikasem2: addFormData.praktikasem2,
      laboratoresem2: addFormData.laboratoresem2,
    };
    /*  dispatch(shtoPlan(newContact))
    .then(data=>setContacts(el => el.map((r) => (r.id  ? r : data.payload.result.items)))
    ) */

    dispatch(shtoPlan(newContact))
      .unwrap()
      .then((res) => {
        // console.log(res);
        if (res.code === 200) {
          setContacts((el) => el.map((r) => (r.id ? r : res.result.items)));
          setAddFormData([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editId,
      plani: planiid,
      viti: viti,
      renditja: editFormData.renditja,
      titullari: editFormData.titullari,
      emertimi: editFormData.emertimi,
      tipiveprimtarise: editFormData.tipiveprimtarise,
      kredite: editFormData.kredite,
      nrjavesem1: editFormData.nrjavesem1,
      seminaresem1: editFormData.seminaresem1,
      leksionesem1: editFormData.leksionesem1,
      praktikasem1: editFormData.praktikasem1,
      laboratoresem1: editFormData.laboratoresem1,
      nrjavesem2: editFormData.nrjavesem2,
      seminaresem2: editFormData.seminaresem2,
      leksionesem2: editFormData.leksionesem2,
      praktikasem2: editFormData.praktikasem2,
      laboratoresem2: editFormData.laboratoresem2,
    };
    console.log(editFormData);
    dispatch(updatePlanpermbajtja(editedContact))
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res.code === 200) {
          const newContacts = [...contacts];

          const index = contacts.findIndex((contact) => contact.id === editId);

          newContacts[index] = res.result.items;
          //console.log(editedContact)
          setContacts(newContacts);
          setEditId(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    //dispatch(updatePlanpermbajtja(editedContact))
  };

  const handleDeleteClick = (contactId) => {
    dispatch(deletePlanpermbajtja(contactId));
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };

  // --------------------------------------------------------------------------------------------------
  const [rowsData, setRowsData] = useState([]);

  const addTableRows = () => {
    const rowsInput = {
      renditja: "",
      titullari: "",
      emertimi: "",
      tipiveprimtarise: "",
      kredite: "",
      nrjavesem1: "",
      seminare1: "",
      leksione1: "",
      praktika1: "",
      laboratore1: "",
      nrjavesem2: "",
      seminare2: "",
      leksione2: "",
      praktika2: "",
      laboratore2: "",
    };
    setAddFormData([...addFormData, rowsInput]);

    setContacts([...contacts, rowsInput]);
  };

  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  };

  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    setRowsData(rowsInput);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditId(contact.id);

    const formValues = {
      plani: contact.plani,
      viti: contact.viti,
      renditja: contact.renditja,
      titullari: contact.titullari,
      emertimi: contact.emertimi,
      tipiveprimtarise: contact.tipiveprimtarise,
      kredite: contact.kredite,
      nrjavesem1: contact.nrjavesem1,
      seminaresem1: contact.seminaresem1,
      leksionesem1: contact.leksionesem1,
      praktikasem1: contact.praktikasem1,
      laboratoresem1: contact.laboratoresem1,
      nrjavesem2: contact.nrjavesem2,
      seminaresem2: contact.seminaresem2,
      leksionesem2: contact.leksionesem2,
      praktikasem2: contact.praktikasem2,
      laboratoresem2: contact.laboratoresem2,
    };

    setEditFormData(formValues);
  };

  return (
    <>
      {planpermbajtjaState.getPlanpermbajtjeStatus === "pending" ||
      planpermbajtjaState.shtoPlanpermbajtjeStatus === "pending" ||
      planpermbajtjaState.deletePlanpermbajtjaStatus === "pending" ||
      planpermbajtjaState.updatePlanpermbajtjaStatus === "pending" ? (
        <Loading center />
      ) : (
        <Wrapper>
          {planpermbajtjaState.getPlanpermbajtjeStatus === "rejected" ||
          (planpermbajtjaState.shtoPlanpermbajtjeStatus === "rejected") |
            (planpermbajtjaState.deletePlanpermbajtjaStatus === "rejected") ||
          planpermbajtjaState.updatePlanpermbajtjaStatus === "rejected" ? (
            <Alert variant="danger">
              {planpermbajtjaState.updatePlanpermbajtjaError ||
                planpermbajtjaState.shtoPlanpermbajtjeError ||
                planpermbajtjaState.updatePlanpermbajtjaError ||
                planpermbajtjaState.shtoPlanpermbajtjeError}
            </Alert>
          ) : null}
          <table className="table">
            <thead>
              <tr key="kolonat">
                {columnsData.map((column) => (
                  <th className="classname" key={column.field}>
                    {" "}
                    {column.header}
                  </th>
                ))}

                <th>
                  <button
                    className="btn btn-outline-success"
                    onClick={addTableRows}
                  >
                    +
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {contacts.length > 0
                ? contacts.map((contact) => (
                    <>
                      {editId === contact.id ? (
                        <EditableRow
                          editFormData={editFormData}
                          handleEditFormChange={handleEditFormChange}
                          handleCancelClick={handleCancelClick}
                          handleEditFormSubmit={handleEditFormSubmit}
                        />
                      ) : !contact.id ? (
                        <Addrow
                          addFormData={addFormData}
                          handleAddFormChange={handleAddFormChange}
                          handleCancelClick={handleCancelClick}
                          handleAddFormSubmit={handleAddFormSubmit}
                        />
                      ) : (
                        <Readonlyrow
                          mydata={contact}
                          handleEditClick={handleEditClick}
                          handleDeleteClick={handleDeleteClick}
                        />
                      )}
                    </>
                  ))
                : null}
            </tbody>
          </table>{" "}
        </Wrapper>
      )}
    </>
  );
}
export default EditableTable;