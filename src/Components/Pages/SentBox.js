import React, { useState, useCallback, useMemo } from "react";
import { Modal, Table, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { TableBody } from "@mui/material";
import { deleteSentMailHandler, sentMessageSeen } from "../../Store/DataActions";

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

const SentBox = () => {
  const dispatch = useDispatch();
  const sentMails = useSelector((state) => state.data.sentData);
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
        dispatch(sentMessageSeen(mail));
      }
    },
    [dispatch]
  );

  const deleteHandler = useCallback(
    (mail, event) => {
      event.stopPropagation(); 
      dispatch(deleteSentMailHandler(mail.key));
    },
    [dispatch]
  );

  const memoizedSentMails = useMemo(
    () =>
      sentMails.map((mail) => (
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
    [sentMails, tableHandler, deleteHandler]
  );

  return (
    <>
      <Table hover>
        <TableBody>{memoizedSentMails}</TableBody>
      </Table>
      {showModal && <ModalData showModal={showModal} mailData={mailData} closeHandler={closeHandler} />}
    </>
  );
};

export default SentBox;
