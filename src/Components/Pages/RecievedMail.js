import axios from "axios";
import {  Modal, Table, Button, Row } from "react-bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux";
import { TableBody } from "@mui/material";
import { useDispatch } from "react-redux";
import { fun } from "../../Store/DataSlice";
const RecievedMail = () => {
  const dispatch = useDispatch()
  let inboxMails = useSelector((state) => state.data.inboxData);
  const [showModal, setShowModal] = useState(false);
  const [mailData, setMailData] = useState({})  
  const closeHandler = () => {setShowModal(false)}
  const email = localStorage.getItem("email");

  const tableHandler = async (mail) => {
    setMailData(mail)
    setShowModal(true)
    if (mail.status === false) {
      const res = await axios.put(
        `https://mail-box-324ea-default-rtdb.firebaseio.com/${email}/${mail.key}.json`,
        {
          email: mail.email,
          message: mail.message,
          status: true,
          subject: mail.subject,
        }
      );
      dispatch(fun())
      console.log(res);
    } else {
      setMailData(mail)
      setShowModal(true)
    }
  };

  const deleteHandler = async(mail) => {
     await axios.delete(`https://mail-box-324ea-default-rtdb.firebaseio.com/${email}/${mail.key}.json`)
     dispatch(fun())
  };


  const ModalData = () => {
    console.log(mailData)
    return (
      <Modal show={showModal} onHide = {closeHandler}>
        <Modal.Header>{<h2>{mailData.email}</h2>}</Modal.Header>
        <Modal.Body>{mailData.message}</Modal.Body>
        <Modal.Footer className=" justify-content-center">
          <Button variant='secondary' onClick={closeHandler}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  return (
    <>
    <Table  hover>
      {inboxMails.map((mail) => (
        <TableBody key={Math.random()} style={{ width: "80.3vw", display:'flex'}}>
            <tr onClick={tableHandler.bind(this, mail)} key={Math.random()}>
            <td >{mail.status ? "⚪" : "🔵"}</td>
            <td style={{width:'16rem'}}>{mail.email}</td>
            <td style={{width:'12rem'}}>{mail.subject}</td> 
            <td style={{width:'40rem'}}>{mail.message}</td>
            </tr> 
            <Button variant="warning" style={{height:'2.5rem'}} className='mt-.2' size="sm" id="button" onClick={deleteHandler.bind(this, mail)} >Delete</Button>
        </TableBody>
      ))}
    </Table>
    {showModal ? <ModalData />: null}
    </>
  );
};

export default RecievedMail;
