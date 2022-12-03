import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormFloating,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Auth } from "../../Store/AuthSlice";
import { fun } from "../../Store/DataSlice";

const SignUpPage = () => {
  const [req, setReq] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailGetter = useRef("");
  const passwordGetter = useRef("");
  const confirmPasswordGetter = useRef("");

  const RedirectHandler = () => {
    navigate("/login");
  };

  const SubmitHandler = async (event) => {
    event.preventDefault();
    setReq(true);
    const email = emailGetter.current.value;
    const password = passwordGetter.current.value;
    const confirmPassword = confirmPasswordGetter.current.value;
    if (password !== confirmPassword) {
      alert("Please fill all the fields nicely");
      return;
    }

    try {
      const res = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAy_8160lnOQWMqDA2CAbzF3TEfbnAtXiQ",
        {
          email: email,
          password: password,
        }
      );
      dispatch(Auth.login(res.data.idToken));
      localStorage.setItem('normEmail', email)
      dispatch(Auth.initialMail(email))
      setReq(false);
      dispatch(fun())
      navigate("/welcome");
    } catch (error) {
      setReq(false);
      alert(error.response.data.error.errors[0].message);
    }
  };

  return (
    <Container
      fluid
      style={{
        backgroundImage:
          "url(https://i0.wp.com/www.korvia.com/wp-content/uploads/2015/11/korvia-image-background-tnkr-signup.jpg?ssl=1)",
        height: "42rem",
      }}
      className="d-flex align-items-center justify-content-center"
    >
      <Row>
        <Col>
          <Card style={{ width: "25rem" }} shadow>
            <Card.Header
              style={{ height: "5rem" }}
              className="d-flex align-items-center justify-content-center  "
            >
              {<h3>Sign Up</h3>}
            </Card.Header>
            <Form onSubmit={SubmitHandler}>
              <FormFloating className="m-3 mt-3">
                <Form.Control
                  required
                  type="email"
                  ref={emailGetter}
                  placeholder="Email"
                />
                <Form.Label>Email</Form.Label>
              </FormFloating>

              <FormFloating className="m-3 mt-3">
                <Form.Control
                  required
                  type="password"
                  placeholder="Password"
                  ref={passwordGetter}
                />
                <Form.Label>Password</Form.Label>
              </FormFloating>

              <FormFloating className="m-3 mt-3">
                <Form.Control
                  required
                  type="password"
                  ref={confirmPasswordGetter}
                  placeholder="confirm Password"
                />
                <Form.Label>Confirm Password</Form.Label>
              </FormFloating>
              <Card.Footer
                style={{ height: "5rem" }}
                className="d-flex align-items-center justify-content-center"
              >
                <Button
                  style={{ width: "18rem", borderRadius: "25px" }}
                  type="submit"
                  className="primary"
                >
                  {req ? "Sending request" : "Submit"}
                </Button>
              </Card.Footer>
            </Form>
          </Card>
          <Button
            onClick={RedirectHandler}
            className=" mt-3"
            style={{ width: "25rem" }}
          >
            Already have an account? Login
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage;
