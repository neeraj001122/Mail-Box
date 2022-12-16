import { Navbar,Container,Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Auth } from "../../Store/AuthSlice";
import { useNavigate } from "react-router-dom";
import { dataActions } from "../../Store/DataSlice";


const NavBar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const logoutHandler = () => {
     dispatch(Auth.logout())
     dispatch(dataActions.logout1())
     navigate('/login')
  };
    return(
        <>  
        <Navbar  collapseOnSelect expand="lg" style={{backgroundColor:'#968d89'}} >
      <Container>
        <Navbar.Brand>{<h3>Mailido</h3>}</Navbar.Brand>
        <Button onClick={logoutHandler} variant="dark" >Logout</Button>
      </Container>
    </Navbar>


      </>
    );
  }

  export default NavBar;