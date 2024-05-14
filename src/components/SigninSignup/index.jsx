import React, { useState } from 'react'
import Input from '/src/components/Input'
import Button from '/src/components/Button'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db , provider } from '/src/firebase';
import { doc, setDoc, getDoc } from "firebase/firestore";
import "./styles.css";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Dashboard from "/src/pages/Dashboard";



function SigninSignupComponent() {
  const [LoginForm, setLoginForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function CreateDoc(user) {
    setLoading(true);
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("Docs Created");
        setLoading(false);
      }
      catch (err) {
        toast.error(err.message);
        setLoading(false);
      }
    } else {
      toast.error("Doc already Exists");
      setLoading(false);
    }

  }

  function signupWithEmail() {
    setLoading(true);
    // console.log(name, email, password, confirmPassword);
    if (name != "" && email != "") {
      if (password == confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            // console.log(user);
            CreateDoc(user);
            navigate("/dashboard");
            toast.success("User Created");
            setLoading(false);
            setName = ("");
            setEmail = ("");
            setPassword = ("");
            setConfirmPassword = ("");


          })
          .catch((error) => {
            const errorCode = error.code;

            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
            // ..
          });
      } else {
        toast.error("password does not match with Confirm passsword");
        setLoading(false);
      }
    } else {
      toast.error("Please fill all the fields");
      setLoading(false);
    }
  }

  function LoginUsingEmail() {
    setLoading(true);
    if (email != "" && password != "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          toast.success("User Logged In");
          setLoading(false);
          navigate("/dashboard");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false);
          toast.error(errorMessage);
          // ..
        });
    } else {
      toast.error("Please fill all the fields");
      setLoading(false);
    }
  }

  function GoogleAuth(){
  setLoading(true);
  try{
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      CreateDoc(user);
      navigate("/dashboard");
      setLoading(false);
      toast.success("user Authenticated");
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      setLoading(false);
      toast.error(errorMessage);
    });
  }catch(e){toast.error(e.message);}
   setLoading(false);
  }




  return (
    <>
      {LoginForm ? <div className='signup-wrapper'>
        <h2 className='title'>Login on  <span style={{ color: "var(--theme)" }}>FinTrack</span></h2>
        <form action="">

          <Input type={"email"} label={"Email"} state={email} setState={setEmail} placeholder={"Enter here.."} />
          <Input type={"password"} label={"Enter Password"} state={password} setState={setPassword} placeholder={"Enter here.."} />

          <Button disabled={Loading} text={Loading ? "loading.." : "Login using Email & Password"} onClick={LoginUsingEmail} />
          <p style={{ textAlign: "center", margin: 0 }}>or</p>
          <Button text={Loading ? "Loading..." : "Login using Google"} blue={"true"} onClick={GoogleAuth} />
          <p style={{ textAlign: "center", margin: 0 }} onClick={() => setLoginForm(!LoginForm)} >Do not have an Account ? <span style={{ color: "var(--theme)", cursor: "pointer" }}>Click here..</span></p>
        </form>
      </div> : <div className='signup-wrapper'>
        <h2 className='title'>Sign Up on <span style={{ color: "var(--theme)" }}>FinTrack</span></h2>
        <form action="">
          <Input label={"Full Name"} state={name} setState={setName} placeholder={"Enter here.."} />
          <Input type={"email"} label={"Email"} state={email} setState={setEmail} placeholder={"Enter here.."} />
          <Input type={"password"} label={"Enter Password"} state={password} setState={setPassword} placeholder={"Enter here.."} />
          <Input type={"password"} label={"Confirm Password"} state={confirmPassword} setState={setConfirmPassword} placeholder={"Enter here.."} />
          <Button disabled={Loading} text={Loading ? "loading.." : "Sign Up using Email & Password"} onClick={signupWithEmail} />
          <p style={{ textAlign: "center", margin: 0 }}>or</p>
          <Button text={Loading ? "Loading..." : "Sign Up using Google"} blue={"true"} onClick={GoogleAuth} />
          <p style={{ textAlign: "center", margin: 0 }} onClick={() => setLoginForm(!LoginForm)}>Have an Account already ? <span style={{ color: "var(--theme)", cursor: "pointer" }}>Click Here..</span></p>
        </form>
      </div>}

    </>
  )
}

export default SigninSignupComponent;