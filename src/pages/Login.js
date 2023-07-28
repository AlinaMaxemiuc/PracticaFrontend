import { useState } from "react";
import { useNavigate } from "react-router-dom";
import login from "../assets/login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkPass, setCheckPass] = useState(false);
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

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
  function navigateToHome(e) {
    e.preventDefault();
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

  //functie care creeaza un obiect {data} luat din baza de date
  //se "conecteaza" la adresa data si aplica metoda de post pentru a trimite raspunsul cerut
  function login(e) {
    let data = { name: "Apetrei Madalina", password: "parola" };
    fetch("http://localhost:3001/login", { method: "POST", body: data }).then(
      (res) => {
        let data = res.json();
        console.log(data);
       // navigateToHome(e);
      }
    );
  }
  return (
    <div class="form-login">
      <form action="" onSubmit={login}>
        <div class="login">
          <input
            type="email"
            class="form-control"
            name="errUser"
            placeholder="Email"
            onChange={Username}
          />
          {errMessages("errUser")}
        </div>
        <div class="login">
          <input
            type={checkPass ? "text" : "password"}
            class="form-control"
            name="errPass"
            placeholder="Password"
            onChange={Password}
          />
          {errMessages("errPass")}
        </div>
        <div class="showPass">
          <label for="showPass">Show password?</label>
          <input
            type="checkbox"
            onChange={(e) => {
              togglePassword(e);
            }}
          />
        </div>
        <div>
          <button class="btn" type="submit" disabled={!validateForm()}>
            Log in
          </button>
        </div>
      </form>
    </div>
  );
}
