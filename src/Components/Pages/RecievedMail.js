import React, { useState, useCallback, useMemo } from "react";
import { Modal, Table, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { TableBody } from "@mui/material";
import { deleteReceivedMailHandler, receivedMessageSeen } from "../../Store/DataActions";

// Extract Modal Component and Memoize it
const ModalData = React.memo(({ showModal, mailData, closeHandler }) => {
  return (
    <Modal show={showModal} onHide={closeHandler}>
      <Modal.Header>{<h2>{mailData.email}</h2>}</Modal.Header>
      <Modal.Body>{mailData.message}</Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="secondary" onClick={closeHandler}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

const RecievedMail = () => {
  const dispatch = useDispatch();
  const inboxMails = useSelector((state) => state.data.inboxData);
  const [showModal, setShowModal] = useState(false);
  const [mailData, setMailData] = useState({});

  const closeHandler = useCallback(() => {
    setShowModal(false);
  }, []);

  const tableHandler = useCallback(
    (mail) => {
      setMailData(mail);
      setShowModal(true);
      if (mail.status === false) {
        dispatch(receivedMessageSeen(mail));
      }
    },
    [dispatch]
  );

  const deleteHandler = useCallback(
    (mail, event) => {
      event.stopPropagation(); // Prevent triggering the row click event
      dispatch(deleteReceivedMailHandler(mail.key));
    },
    [dispatch]
  );

  const memoizedInboxMails = useMemo(
    () =>
      inboxMails.map((mail) => (
        <tr onClick={() => tableHandler(mail)} key={mail.key} style={{ width: "80.3vw", display: "flex" }}>
          <td>{mail.status ? "⚪" : "🔵"}</td>
          <td style={{ width: "16rem" }}>{mail.email}</td>
          <td style={{ width: "12rem" }}>{mail.subject}</td>
          <td style={{ width: "40rem" }}>{mail.message}</td>
          <td>
            <Button
              variant="warning"
              style={{ height: "2.5rem" }}
              className="mt-.2"
              size="sm"
              id="button"
              onClick={(e) => deleteHandler(mail, e)}
            >
              Delete
            </Button>
          </td>
        </tr>
      )),
    [inboxMails, tableHandler, deleteHandler]
  );

  return (
    <>
      <Table hover>
        <TableBody>
          {memoizedInboxMails}
        </TableBody>
      </Table>
      {showModal && <ModalData showModal={showModal} mailData={mailData} closeHandler={closeHandler} />}
    </>
  );
};

export default RecievedMail;
