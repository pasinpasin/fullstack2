import React, { useState } from "react";
import Wrapper from "../assets/wrappers/Tabela";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import EditableRow2 from "./Editablerow2";
import Readonlyrow2 from "./Readonlyrow2";
import Addrow2 from "./Addrow2";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import Alert from "./Alert";

import {
  deleteLendemezgjedhje,
  getLendemezgjedhje,
  shtoLendemezgjedhje,
  updateLendemezgjedhje,
} from "../features/lendeMeZgjedhjeSlice";
function EditableTable2({ columnsData, semestridata, lendepertezgjedhje }) {
  const dispatch = useDispatch();
  const planpermbajtjaState = useSelector((state) => state.planpermbajtjaState);
  const { planpermbajtja } = planpermbajtjaState;
  const [contacts, setContacts] = useState([]);
  const [listelendesh, setListelendesh] = useState([]);
  const lendemezgjedhjeState = useSelector(
    (state) => state.lendemezgjedhjeState
  );
  const { lendemezgjedhje } = lendemezgjedhjeState;
  //console.log(lendemezgjedhje)

  const { id } = useParams();
  useEffect(() => {
    console.log("effect editable table 2");

    /*  dispatch(getLendemezgjedhje(id))
    .then(data=>setContacts(data.payload.result.items)) */
    setListelendesh(
      lendepertezgjedhje.map((lendet) => {
        const container = {};
        container.emertimi = lendet.emertimi;
        container.id = lendet.id;

        return container;
      })
    );
    setContacts(semestridata);
  }, [semestridata, lendepertezgjedhje]);

  //setContacts(...contacts,lendemezgjedhje)

  const [editId, setEditId] = useState(null);

  console.log(listelendesh);
  const [editFormData, setEditFormData] = useState({
    lenda: "",
    emertimi: "",
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
      lenda: addFormData.lenda,

      emertimi: addFormData.emertimi,
    };
    /*  dispatch(shtoPlan(newContact))
    .then(data=>setContacts(el => el.map((r) => (r.id  ? r : data.payload.result.items)))
    ) */

    dispatch(shtoLendemezgjedhje(newContact))
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
      lenda: editFormData.lenda,

      emertimi: editFormData.emertimi,
    };
    console.log(editFormData);
    dispatch(updateLendemezgjedhje(editedContact))
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

    //dispatch(updateLendemezgjedhje(editedContact))
  };

  const handleDeleteClick = (contactId) => {
    dispatch(deleteLendemezgjedhje(contactId));
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };

  // --------------------------------------------------------------------------------------------------
  const [rowsData, setRowsData] = useState([]);

  const addTableRows = () => {
    const rowsInput = {
      emertimi: "",
      lenda: "",
    };
    setAddFormData([...addFormData, rowsInput]);

    setContacts([...contacts, rowsInput]);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditId(contact.id);

    const formValues = {
      lenda: contact.lenda,

      emertimi: contact.emertimi,
    };

    setEditFormData(formValues);
  };

  return (
    <>
      {lendemezgjedhjeState.getLendemezgjedhjeStatus === "pending" ||
      lendemezgjedhjeState.shtoLendemezgjedhjeStatus === "pending" ||
      lendemezgjedhjeState.deleteLendemezgjedhjeStatus === "pending" ||
      lendemezgjedhjeState.updateLendemezgjedhjeStatus === "pending" ? (
        <Loading center />
      ) : (
        <Wrapper>
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
                        <EditableRow2
                          editFormData={editFormData}
                          handleEditFormChange={handleEditFormChange}
                          handleCancelClick={handleCancelClick}
                          handleEditFormSubmit={handleEditFormSubmit}
                        />
                      ) : !contact.id ? (
                        <Addrow2
                          addFormData={addFormData}
                          handleAddFormChange={handleAddFormChange}
                          handleCancelClick={handleCancelClick}
                          handleAddFormSubmit={handleAddFormSubmit}
                          listelendesh={listelendesh}
                        />
                      ) : (
                        <Readonlyrow2
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
export default EditableTable2;
