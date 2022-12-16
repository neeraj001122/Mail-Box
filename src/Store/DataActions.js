import axios from "axios";
import { dataActions } from "./DataSlice";

export const deleteSentMailHandler = (id) => {
  return  async(dispatch) => {
    const deletingHandler = async () => {
      const email = localStorage.getItem("email");
      try {
        const res = await axios.delete(
          `https://mail-box-324ea-default-rtdb.firebaseio.com/sentmails=${email}/${id}.json`
        );
        if (res.status === 200) {
          console.log(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    await deletingHandler();
    dispatch(dataActions.deleteSentMail(id));
  };
};

export const deleteReceivedMailHandler = (id) => {
  return async (dispatch) => {
    const deletingHandler = async () => {
      const email = localStorage.getItem("email");
      try {
        const res = await axios.delete(
          `https://mail-box-324ea-default-rtdb.firebaseio.com/recievemails=${email}/${id}.json`
        );
        if (res.status === 200) {
          console.log(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    await deletingHandler();
    dispatch(dataActions.deleteReceivedMail(id));
  };
};


export const fetchSentMailHandler = () => {
    return  async(dispatch) => {
      const fetchingHandler = async () => {
        const email = localStorage.getItem("email");
        try{
            const res = await axios.get(
              `https://mail-box-324ea-default-rtdb.firebaseio.com/sentmails=${email}.json`
            );
            const emails = res.data;
            const keys = Object.keys(res.data); 
            const arr = [];
            for (let key of keys) {
              const test = { ...emails[key], key };
              arr.push(test);
            }
           return arr
        }catch (err) {
            console.log(err)
        }
  }
  const sentMails  = await fetchingHandler()
  if(sentMails === undefined)
  {
    dispatch(dataActions.sentData([]))
  }else{
    dispatch(dataActions.sentData(sentMails))
  }
}}

export const fetchReceiveMailHandler = () => {
  return  async(dispatch) => {
    const fetchingHandler = async () => {
      const email = localStorage.getItem("email");
      try{
          const res = await axios.get(
            `https://mail-box-324ea-default-rtdb.firebaseio.com/recievemails=${email}.json`
          );
          const emails = res.data;
          const keys = Object.keys(res.data); 
          let count = 0;
          const arr = [];
          for (let key of keys) {
            const test = { ...emails[key], key };
            arr.push(test);
            if(emails[key].status === false)
            {
              count++
            }
          }
          dispatch(dataActions.unreadMessages(count))
         return arr
      }catch (err) {
          console.log(err)
      }
}
const sentMails  = await fetchingHandler()
if(sentMails === undefined)
{
  dispatch(dataActions.inboxData([]))
}else{
  dispatch(dataActions.inboxData(sentMails))
}
}}

export const receivedMessageSeen = (mail) => {
    return async(dispatch) => {
      const email = localStorage.getItem("email");
      try{
        const res = await axios.put(
          `https://mail-box-324ea-default-rtdb.firebaseio.com/recievemails=${email}/${mail.key}.json`,
          {
            email: mail.email,
            message: mail.message,
            status: true,
            subject: mail.subject,
          }
        );
        console.log(res)
        dispatch(fetchReceiveMailHandler())
      }
      catch (err)
      {
        console.log(err)
      }
    }
}

export const sentMessageSeen = (mail) => {
  return async(dispatch) => {
    const email = localStorage.getItem("email");
    try{
      const res = await axios.put(
        `https://mail-box-324ea-default-rtdb.firebaseio.com/sentmails=${email}/${mail.key}.json`,
        {
          email: mail.email,
          message: mail.message,
          status: true,
          subject: mail.subject,
        }
      );
      console.log(res)
      dispatch(fetchSentMailHandler())
    }
    catch (err)
    {
      console.log(err)
    }
  }
}

