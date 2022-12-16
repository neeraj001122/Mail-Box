import NavBar from "./Navbar";
import { Button, Row, Col, } from "react-bootstrap";
import ComponseEmailPage from "./ComposeEmailPage";
import { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import RecievedMail from "./RecievedMail";
import { useSelector } from "react-redux";
import SentBox from "./SentBox";

const Welcome = () => {
  const [showRec, setShowRec] = useState(false)
  const [showSent, setShowSent] = useState(false)
  const [showCompose, setShowCompose] = useState(false);
  const unreadMessages = useSelector(state => state.data.unreadMessages)
  const showHandler = () => {
    setShowCompose(true);
  };

  const showRecHandler = () => {
    setShowSent(false)
    setShowRec(true)
  };

  const showSentHandler = () => {
    setShowRec(false)
    setShowSent(true)
  };

  return (
    <>
      <NavBar />
        <Row className="g-0">
          <Col >
            <Sidebar
              style={{
                height: "100vh",
                backgroundColor: "#968d89",
              }}
            >
              <Menu>
                <MenuItem>
                  {" "}
                  {<Button onClick={showHandler}>Compose mail</Button>}{" "}
                </MenuItem>
                <SubMenu label={`Messages  🆕 ${unreadMessages}`}>
                  <MenuItem onClick={showSentHandler}> SentBox </MenuItem>
                  <MenuItem onClick={showRecHandler}> Inbox 🆕 {unreadMessages}</MenuItem>
                </SubMenu>
              </Menu> 
            </Sidebar>
          </Col>
          <Col>
            {showSent && <SentBox />}
            {showRec && <RecievedMail />}
          </Col>
          {showCompose && (
            <ComponseEmailPage show={showCompose} hide={setShowCompose} />
          )}
        </Row>
    </>
  );
};

export default Welcome;
