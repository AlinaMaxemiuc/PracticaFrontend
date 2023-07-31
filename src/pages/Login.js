import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import login from "../assets/login.css";
import {request} from "../utils/utils.js"

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkPass, setCheckPass] = useState(false);
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [user, setUsers] = useState([]);

  const database = [
    {
      username: "user1@gmail.com",
      password: "password1",
    },
    {
      username: "user2@gmail.com",
      password: "password2",
    },
  ];

  const errors = {
    errUser: "Invalid username",
    errPass: "Invalid password",
  };

  //verificare email si parola pt user si afiseaza eroare in caz ca nu e bn
  const handleSubmit = (e) => {
    e.preventDefault();
    var { errUser, errPass } = document.forms[0];

    const userData = database.find((user) => user.username == errUser.value);

    if (userData) {
      if (userData.password != errPass.value) {
        setErrorMessages({ name: "errPass", message: errors.errPass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      setErrorMessages({ name: "errUser", message: errors.errUser });
    }
  };

  //eroare afisata pe un div/ecran
  const errMessages = (e) =>
    e === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  //navigare catre pagina de home
  function navigateToHome() {
    // e.preventDefault(e);
    navigate("/home");
  }

  //pentru checkBox =>arata sau ascunde parola
  const togglePassword = (e) => {
    setCheckPass(e.target.checked);
  };

  //validare form
  function validateForm() {
    return username.length > 6 && password.length > 6;
  }

  //setare username (imi ramane salvat intr-un "pop-up" email-utile deja introduse)
  function Username(user) {
    setUsername(user.target.value);
  }
  //parola
  function Password(pass) {
    setPassword(pass.target.value);
  }


  //localStorage getItem - iau cheia pt afisare
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.name) {
      navigateToHome();
    }
  }, []);
  
  //functie care creeaza un obiect {data} luat din baza de date
  //se "conecteaza" la adresa data si aplica metoda de post pentru a trimite raspunsul cerut
  async function login(e) {
    let data = { name: "Apetrei Madalina", password: "parola" };
    const url = "http://localhost:3001/login";
    try {
      const responseData = await request(url, "POST", data);
      localStorage.setItem("user", JSON.stringify(responseData));
      console.log(responseData);
    } catch (error) {
      console.error( error);
      throw error;
    }
    
  }
  return (
    <div className="form-login">
      <form action="" onSubmit={login}>
        <div className="login">
          <input
            type="email"
            className="form-control"
            name="errUser"
            placeholder="Email"
            onChange={Username}
          />
          {errMessages("errUser")}
        </div>
        <div className="login">
          <input
            type={checkPass ? "text" : "password"}
            className="form-control"
            name="errPass"
            placeholder="Password"
            onChange={Password}
          />
          {errMessages("errPass")}
        </div>
        <div className="showPass">
          <label className="showPass">Show password?</label>
          <input
            type="checkbox"
            onChange={(e) => {
              togglePassword(e);
            }}
          />
        </div>
        <div>
          <button className="btn" type="submit" disabled={!validateForm()}>
            Log in
          </button>
        </div>
      </form>
    </div>
  );
}
