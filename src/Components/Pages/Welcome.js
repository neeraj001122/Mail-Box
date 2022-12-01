import NavBar from "./Navbar";
import { Button, Container } from "react-bootstrap";
import ComponseEmailPage from "./ComposeEmailPage";
import { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import SentBox from "./SentBox";


const Welcome = () => {
  const [showCompose, setShowCompose] = useState(false);
  const showHandler = () => {
    setShowCompose(true)
  };
  return(
    <>
    <NavBar />
    <Container fluid>
    <Sidebar>
  <Menu style={{height:'100vw'}}>
  <MenuItem> {<Button onClick={showHandler}>Compose mail</Button>} </MenuItem>
    <SubMenu label="Charts">
      <MenuItem> Pie charts </MenuItem>
      <MenuItem> Line charts </MenuItem>
    </SubMenu>
    <MenuItem> Documentation </MenuItem>
  </Menu>
</Sidebar>
<SentBox />    
    {showCompose && <ComponseEmailPage show={showCompose} hide={setShowCompose} />}
    </Container>
    </>
  )
};

export default Welcome;