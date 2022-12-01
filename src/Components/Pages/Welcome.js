import NavBar from "./Navbar";
import { Button } from "react-bootstrap";
import ComponseEmailPage from "./ComposeEmailPage";
import { useState } from "react";

const Welcome = () => {
  const [showCompose, setShowCompose] = useState(false);
  const showHandler = () => {
    setShowCompose(true)
  };
  return(
    <>
    <NavBar />
    <Button onClick={showHandler}>Compose mail</Button>
    {showCompose && <ComponseEmailPage show={showCompose} hide={setShowCompose} />}
    </>
  )
};

export default Welcome;