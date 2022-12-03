import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import SunEditor from "suneditor-react";
import { useRef, useState } from "react";
import "suneditor/dist/css/suneditor.min.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fun, fun2 } from "../../Store/DataSlice";

const ComponseEmailPage = (props) => {
  const dispatch = useDispatch()
  const apimail = useSelector(state => state.auth.email)  
  const normEmail = localStorage.getItem('normEmail')
  const emailRef = useRef('');
  const subjectRef = useRef('');
  const [data, setData] = useState('');
 

  const submitHandler = async(event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const subject = subjectRef.current.value;
    if(email.includes('@') !== true || email.includes('.com') !== true)
    {
      alert('Oops, guess something is missing in gmail, please check.')
      return
    }
    const data1 = data.replace(/<[^>]+>/g, '')
    const data2 = data1.replace(/&nbsp;/g,'')
    const emailRec = email.replace('@','').replace('.','')
    // https://mail-box-324ea-default-rtdb.firebaseio.com/global/sent${statemail}.json
    await axios.post(`https://mail-box-324ea-default-rtdb.firebaseio.com/global${apimail}.json`,{
      email:email,
      subject:subject,
      message:data2,
      status:false
    })

    await axios.post(`https://mail-box-324ea-default-rtdb.firebaseio.com/${emailRec}.json`,{
      email:normEmail,
      subject:subject,
      message:data2,
      status:false
    })
    dispatch(fun())
    dispatch(fun2())
    props.hide(false)
  };

  const changeHandler = (value) => {
    setData(value)
  };

  const onClose = () => props.hide(false)

  return (
    <>
      <Modal show={props.show} onHide={onClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Please check all the fields before sending</Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitHandler}>
          <InputGroup className="mb-3 mt-3">
            <InputGroup.Text id="inputGroup-sizing-sm">To</InputGroup.Text>
            <Form.Control
              ref={emailRef}
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </InputGroup>
          <InputGroup className="mb-3 mt-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Subject</InputGroup.Text>
            <Form.Control
              ref={subjectRef}
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </InputGroup>
          <Modal.Footer>
            <SunEditor value={(e) => setData(e.target.value)} onChange={changeHandler} />
            <Button type='submit' style={{ width: "10rem" }} className="mt-1">
              Send
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ComponseEmailPage;
