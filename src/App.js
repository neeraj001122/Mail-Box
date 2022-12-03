import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "./Components/Authentication/SignUpPage";
import LoginPage from "./Components/Authentication/LoginPage";
import Welcome from "./Components/Pages/Welcome"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Auth } from "./Store/AuthSlice";
import { fun, fun2 } from "./Store/DataSlice";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fun())
    dispatch(fun2())
    repeatFun();
  }, [])

 const repeatFun = () => {
  dispatch(fun())
  dispatch(fun2())
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
