import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormFloating,
  Row,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Auth } from "../../Store/AuthSlice";
import { fun } from "../../Store/DataSlice";
const LoginPage = () => {
  const [req, setReq] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailGetter = useRef("");
  const passwordGetter = useRef("");

  const redirectHandler = () => {
    navigate("/");
  };

  const SubmitHandler = async (event) => {
    event.preventDefault();
    setReq(true);
    const email = emailGetter.current.value;
    const password = passwordGetter.current.value;
    console.log(email);

    try {
      const res = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAy_8160lnOQWMqDA2CAbzF3TEfbnAtXiQ",
        {
          email: email,
          password: password,
          returnSecureToken: true,
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

      console.log(error);
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "url(https://plexcollectionposters.com/images/2021/05/16/background-images-for-login-page3bc68c53b0db224b.jpg)",
      }}
    >
      <Container
        fluid
        className="d-flex align-items-center justify-content-center "
        style={{ height: "41rem" }}
      >
        <Row>
          <Col>
            <Card style={{ width: "25rem" }} className="mb-5">
              <Card.Header
                style={{ height: "5rem" }}
                className="d-flex align-items-center justify-content-center  "
              >
                {<h3>Login</h3>}
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
            <Button onClick={redirectHandler} style={{ width: "25rem" }}>
              Don't have an account? SignUp
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
