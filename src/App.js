import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "./Components/Authentication/SignUpPage";
import LoginPage from "./Components/Authentication/LoginPage";
import Welcome from "./Components/Pages/Welcome"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Auth } from "./Store/AuthSlice";
import { fetchReceiveMailHandler, fetchSentMailHandler } from "./Store/DataActions";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSentMailHandler())
    dispatch(fetchReceiveMailHandler())
    repeatFun();
  }, [dispatch])

 const repeatFun = () => {
  dispatch(fetchSentMailHandler())
  dispatch(fetchReceiveMailHandler())
  setTimeout(() => {
    repeatFun()
  }, 2000) 
}





  useEffect(() => {
   if(localStorage.getItem('email') !== null)
   {
    dispatch(Auth.login(localStorage.getItem('token')));
    dispatch(Auth.initialMail(localStorage.getItem('email')));
   }
  },[dispatch]);


  return (
    <>
    <Routes>
      <Route path="/welcome" element={<Welcome />}></Route>
      <Route path="" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
    </>
  );
}

export default App;
