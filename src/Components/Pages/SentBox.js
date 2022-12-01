import axios from "axios";
import { useEffect } from "react";

const SentBox = () => {
    const effectFun = async() => {
       const res = await axios.get('https://mail-box-324ea-default-rtdb.firebaseio.com/global.json')
       console.log(res)
    };
   useEffect(() => {
     effectFun()
   }, [])
   return(
      <h1>1</h1>      
   )
};

export default SentBox;