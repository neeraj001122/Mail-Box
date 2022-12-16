import {  Modal, Table, Button } from "react-bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux";
import { TableBody } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteSentMailHandler, sentMessageSeen } from "../../Store/DataActions";
const SentBox = () => {
  const dispatch = useDispatch()
  let sentMails = useSelector((state) => state.data.sentData);
  const [showModal, setShowModal] = useState(false);
  const [mailData, setMailData] = useState({})  
  const closeHandler = () => {setShowModal(false)}

  const tableHandler = async (mail) => {
    setMailData(mail)
    setShowModal(true)
    if (mail.status === false) {
      dispatch(sentMessageSeen(mail))
    } else {
      setMailData(mail)
      setShowModal(true)
    }
  };

  const deleteHandler = (mail) => {
     dispatch(deleteSentMailHandler(mail.key))
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
      {sentMails.map((mail) => (
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

export default SentBox;