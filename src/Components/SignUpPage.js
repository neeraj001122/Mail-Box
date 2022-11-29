import { Button, Card, Container, Form, FormFloating } from "react-bootstrap";
import axios from "axios";
import { useRef } from "react";

const SignUpPage = () => {
  const emailGetter = useRef("");
  const passwordGetter = useRef("");
  const confirmPasswordGetter = useRef("");

  const SubmitHandler = async (event) => {
    event.preventDefault();
    const email = emailGetter.current.value;
    const password = passwordGetter.current.value;
    const confirmPassword = confirmPasswordGetter.current.value;
    if (password !== confirmPassword) {
      alert("Please fill all the fields nicely");
      return;
    }
    const obj = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    try {
      const res = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?ke=AIzaSyAy_8160lnOQWMqDA2CAbzF3TEfbnAtXiQ",
        {
          obj,
        }
      );
      console.log(obj);
      console.log(res);
    } catch (error) {
      alert(error.response.data.error.errors[0].message);
    }
  };

  return (
    <Container fluid style={{backgroundImage:'url(https://i0.wp.com/www.korvia.com/wp-content/uploads/2015/11/korvia-image-background-tnkr-signup.jpg?ssl=1)', height:'40rem'}} className="d-flex align-items-center justify-content-center">
      <Card style={{ width: "25rem"}} shadow>
        <Card.Header style={{height:'5rem'}} className="d-flex align-items-center justify-content-center  " >{<h3>Sign Up</h3>}</Card.Header>
        <Form onSubmit={SubmitHandler}>
          <FormFloating className="m-3 mt-3">
            <Form.Control
              required
              type="text"
              ref={emailGetter}
              placeholder="Email"
            />
            <Form.Label>Name</Form.Label>
          </FormFloating>

          <FormFloating className="m-3 mt-3">
            <Form.Control required type="password" placeholder="Password" ref={passwordGetter} />
            <Form.Label>Password</Form.Label>
          </FormFloating>

          <FormFloating className="m-3 mt-3">
            <Form.Control
              required
              type="password"
              ref={confirmPasswordGetter}
              placeholder='confirm Password'
            />
            <Form.Label>Confirm Password</Form.Label>
          </FormFloating>
          <Card.Footer  style={{height:'5rem'}} className="d-flex align-items-center justify-content-center">
            <Button
              style={{ width: "18rem", borderRadius: "25px" }}
              type="submit"
              className="primary"
            >
              Submit
            </Button>
          </Card.Footer>
        </Form>
      </Card>
    </Container>
  );
};

export default SignUpPage;
