import { useState } from "react";
import { useNavigate } from "react-router-dom";
import login from "../assets/login.css";

export default function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword]= useState("");
  const[checkPass, setCheckPass]=useState(false);
  const navigate=useNavigate();
  const[errorMessages,setErrorMessages]=useState({});
  const[isSubmitted,setIsSubmitted]=useState(false);

  const database=[
    {
      username: "user1@gmail.com",
      password: "password1"
    },
    {
      username:"user2@gmail.com",
      password:"password2"
    }
  ];
  const errors={
    errUser:"Invalid username",
    errPass:"Invalid password"
  }
  const handleSubmit=(e)=>
  {
    e.preventDefault();
    var {errUser,errPass}=document.forms[0];

    const userData = database.find((user)=>user.username==errUser.value);

    if(userData)
    {
      if(userData.password!=errPass.value){
        setErrorMessages({name:"errPass", message: errors.errPass});
      }else{
        setIsSubmitted(true);
      }
    }else{
      setErrorMessages({name:"errUser", message: errors.errUser});
    }
  };

  const errMessages=(e)=>e===errorMessages.name &&(<div className="error">{errorMessages.message}</div>);


  function navigateToHome(e){
    e.preventDefault();
    navigate('/home');
  }

  const togglePassword=(e)=>{
    setCheckPass(e.target.checked);
  }
 
  function validateForm()
  {
    return username.length>6 && password.length>6;
  }

  function Username(user)
  {
    setUsername(user.target.value);
  }
  function Password (pass)
  {
    setPassword(pass.target.value);
  }
  return (
 
    <div class="form-login">
      {/* <h1 class="hLogin">Login</h1> */}
    <form action="" onSubmit={(e)=>navigateToHome(e)}>
      <div class="login">
        {/* <p>Username</p> */}
        <input type="email" class="form-control" name="errUser" placeholder="Email" onChange={Username}/>
        {/* <label for ="floatingInput">Email adress</label> */}
        {errMessages("errUser")}
        </div>
        <div class="login">
        {/* <p >Password</p> */}
        <input type={checkPass ? "text": "password"} class="form-control" name="errPass" placeholder="Password" onChange={Password}/>
        {/* <label for="floatingPassword">Password</label> */}
        {errMessages("errPass")}
      </div>
      <div class="showPass"> 
        <label for="showPass" >Show password?</label>
        <input type="checkbox" 
        onChange={(e=>{togglePassword(e)})}
        //  checked={togglePassword}
         /></div>
      <div>
        <button class="btn" type="submit" disabled={!validateForm()} >Log in</button>
      </div>
    </form>
    </div>

  );
}
