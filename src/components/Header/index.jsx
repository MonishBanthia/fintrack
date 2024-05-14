import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import './styles.css';
import { useNavigate } from "react-router-dom";
import { auth } from "/src/firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import userImg from "/src/assets/user.svg"


function Header() {
  const navigate = useNavigate();
  const [user , loading]  = useAuthState(auth);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  function logoutfn(){
    try{
       signOut(auth)
       .then(()=>{
          toast.success("Logged OUT !!");
          navigate("/");
       })
       .catch((error)=>{
        toast.error(error.message);
       });
    }
    catch(e){
      toast.error(e.messasge);
    }
  }

  return (<div className='navbar'> 
  <p className='logo'>FinTrack</p>
  {user &&
  (<div style={{display : "flex" , alignItems: "center" , gap:"0.5rem"}}>
    <img 
    src={user.photoURL ? user.photoURL : userImg}
    style={{ borderRadius: "50%" , height : "1.5rem" , width : "1.5rem"}}
    />
  <p onClick={logoutfn} className='logo link'>Logout</p> 
  </div>
  )}
  </div>
  ); 
}

export default Header