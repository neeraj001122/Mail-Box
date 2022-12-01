import { Navbar,Container,Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Auth } from "../../Store/AuthReducer";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const logoutHandler = () => {
     dispatch(Auth.logout())
     navigate('/login')
  };
    return(
        <>
        <Navbar className=" mb-3" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>{<h3>Mailido</h3>}</Navbar.Brand>
        <Button onClick={logoutHandler} variant="dark" >Logout</Button>
      </Container>
    </Navbar>
      </>
    );
  }

  export default NavBar;