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
function EditableTable2({ columnsData2, semestridata2, lendepertezgjedhje }) {
  const dispatch = useDispatch();
  const planpermbajtjaState = useSelector((state) => state.planpermbajtjaState);
  const { planpermbajtja } = planpermbajtjaState;
  const [contacts2, setContacts2] = useState([]);
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
    .then(data=>setContacts2(data.payload.result.items)) */
    setListelendesh(
      lendepertezgjedhje.map((lendet) => {
        const container = {};
        container.emertimi = lendet.emertimi;
        container.id = lendet.id;

        return container;
      })
    );
    setContacts2(semestridata2);
  }, [semestridata2, lendepertezgjedhje]);

  //setContacts2(...contacts2,lendemezgjedhje)

  const [editId2, setEditId2] = useState(null);

  console.log(listelendesh);
  const [editFormData2, setEditFormData2] = useState({
    lenda: "",
    emertimi: "",
  });

  const [addFormData2, setAddFormData2] = useState([]);

  const handleEditFormChange2 = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    //console.log(fieldValue);
    const newFormData2 = { ...editFormData2 };
    newFormData2[fieldName] = fieldValue;

    setEditFormData2(newFormData2);
    // console.log(editFormData2)
  };
  const handleCancelClick2 = () => {
    setEditId2(null);
    const  newContacts2 = [...contacts2];

    const index = contacts2.findIndex((contact) => contact.id === null);

     newContacts2.splice(index, 1);

    setContacts2( newContacts2);
    setAddFormData2([]);
  };

  const handleAddFormChange2 = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    console.log(fieldValue);
    const newFormData2 = { ...addFormData2 };
    newFormData2[fieldName] = fieldValue;

    setAddFormData2(newFormData2);
  };

  const handleAddFormSubmit2 = (event) => {
    event.preventDefault();

    const newContact = {
      lenda: addFormData2.lenda,

      emertimi: addFormData2.emertimi,
    };
    /*  dispatch(shtoPlan(newContact))
    .then(data=>setContacts2(el => el.map((r) => (r.id  ? r : data.payload.result.items)))
    ) */
    console.log(newContact)

    dispatch(shtoLendemezgjedhje(newContact))
      .unwrap()
      .then((res) => {
        // console.log(res);
        if (res.code === 200) {
          setContacts2((el) => el.map((r) => (r.id ? r : res.result.items)));
          setAddFormData2([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditFormSubmit2 = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editId2,
      lenda: editFormData2.lenda,

      emertimi: editFormData2.emertimi,
    };
    console.log(editFormData2);
    dispatch(updateLendemezgjedhje(editedContact))
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res.code === 200) {
          const  newContacts2 = [...contacts2];

          const index = contacts2.findIndex((contact) => contact.id === editId2);

           newContacts2[index] = res.result.items;
          //console.log(editedContact)
          setContacts2( newContacts2);
          setEditId2(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    //dispatch(updateLendemezgjedhje(editedContact))
  };

  const handleDeleteClick2 = ( contact2Id) => {
    dispatch(deleteLendemezgjedhje( contact2Id));
    const  newContacts2 = [...contacts2];

    const index = contacts2.findIndex((contact) => contact.id ===  contact2Id);

     newContacts2.splice(index, 1);

    setContacts2( newContacts2);
  };



  const addTableRows2 = () => {
    const rowsInput2 = {
      emertimi: "",
      lenda: "",
    };
    setAddFormData2([...addFormData2, rowsInput2]);

    setContacts2([...contacts2, rowsInput2]);
  };

  const handleEditClick22 = (event, contact) => {
    event.preventDefault();
    setEditId2(contact.id);

    const formValues2 = {
      lenda: contact.lenda,

      emertimi: contact.emertimi,
    };

    setEditFormData2(formValues2);
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
              <tr key="kolonat2">
                {columnsData2.map((column2) => (
                  <th className="classname" key={column2.field}>
                    {" "}
                    {column2.header}
                  </th>
                ))}

                <th>
                  <button
                    className="btn btn-outline-success"
                    onClick={addTableRows2}
                  >
                    +
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {contacts2.length > 0
                ? contacts2.map((lendetek) => (
                    <>
                      {editId2 === lendetek.id ? (
                        <EditableRow2
                          editFormData2={editFormData2}
                          handleEditFormChange2={handleEditFormChange2}
                          handleCancelClick2={handleCancelClick2}
                          handleEditFormSubmit2={handleEditFormSubmit2}
                        />
                      ) : !lendetek.id ? (
                        <Addrow2
                          addFormData2={addFormData2}
                          handleAddFormChange2={handleAddFormChange2}
                          handleCancelClick2={handleCancelClick2}
                          handleAddFormSubmit2={handleAddFormSubmit2}
                          listelendesh={listelendesh}
                        />
                      ) : (
                        <Readonlyrow2
                          mydata2={lendetek}
                          handleEditClick2={handleEditClick22}
                          handleDeleteClick2={handleDeleteClick2}
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
