import React, { useEffect, useState } from "react";
import "./column.css";
import axios from "axios";
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { Input, Modal, ModalOverlay, Button, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@chakra-ui/react";

const Column = () => {
  const [formValue, setFormValue] = useState({
    firstname: '',
    lastname: '',
    mobileNumber: ''
  })
  const [columns, setColumns] = React.useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [initialData, setInitialData] = useState(columns);


  // Getting all data on table

  const getData = async () => {
    try {
      let response = await axios.get(`https://aswassign.onrender.com/users/`)
      console.log(response)
      setColumns(response.data)
      setInitialData(response.data)
    }
    catch (e) {

    }
  }
  useEffect(() => {
    getData()
  }, [])


  // Deleting  user data
  const deleteuser = async (ProId) => {

    return axios
      .delete(`https://aswassign.onrender.com/users/${ProId}`)
      .then((r) => {
        alert("USer Data Deleted")
        getData()
      })
      .catch((e) => console.log(e));
  }




  // Editing Data
  const handleEdit = (e) => {
    setIsOpen(true)
  }
  const handleChangeData = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value })
    console.log(formValue)
  }
  const handleEditeDataChange = async (_id) => {
    const payload = {
      firstname: formValue.firstname,
      lastname: formValue.lastname,
      mobileNumber: formValue.mobileNumber
    }
    await axios.put(`https://aswassign.onrender.com/users/edit/${_id}`, payload)
    setIsOpen(false)
    await getData()
  };
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Mobile Number</th>
            <th>Password</th>
            <th>Profile Picture</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {columns.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.firstname}</td>
              <td>{item.lastname}</td>
              <td>{item.mobileNumber}</td>
              <td>{item.password.substring(0, 10) + "..."}</td>
              <td>
                <img src="data:image/png;base64,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" alt="Profile" />
              </td>

              <td>
                <button className="edit" onClick={handleEdit}><FaPen /></button>
              </td>
              <td>
                <button className="delete" onClick={() => deleteuser(item._id)}
                ><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {
        initialData.map((item) => (
          <Modal key={item._id} isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit User Profile</ModalHeader>
              <ModalBody>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ display: "flex", gap: "10px" }}><lable>Firstname</lable> <Input type="text" value={formValue.firstname} name="firstname" onChange={handleChangeData} /><Button onClick={() => handleEditeDataChange(item._id)}>Save</Button></div>
                  <div style={{ display: "flex", gap: "10px" }}><lable>Lastname</lable> <Input type="text" value={formValue.lastname} name="lastname" onChange={handleChangeData} /> </div>
                  <div style={{ display: "flex", gap: "10px" }}><lable>MobileNumber</lable> <Input type="text" value={formValue.mobileNumber} name="mobileNumber" onChange={handleChangeData}></Input></div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button onClick={() => setIsOpen(false)}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )
        )
      }
    </>
  );
};

export default Column;


