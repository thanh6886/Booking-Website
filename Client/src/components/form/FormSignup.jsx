import { useState } from "react";
import classes from "./FormSignup.module.css";
import { Link, useNavigate } from "react-router-dom";
import url from "../../utils/url";

const FormSignup = () => {
  const navigate = useNavigate();
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [error, setError] = useState(null);

  const createAccount = () => {
    setError(null);
    fetch(url.root + "/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Created failed!") {
          throw new Error(data.err);
        }
        navigate("/login");
      })
      .catch((err) => {
        setError({ message: err.message });
      });
  };

  return (
    <form className={classes.form}>
      <h1>Sign Up</h1>
      {error && <p style={{ color: "red" }}>{error.message}</p>}
      <input
        type="email"
        placeholder="Your email..."
        value={enteredEmail}
        onChange={(e) => setEnteredEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Your password..."
        value={enteredPassword}
        onChange={(e) => setEnteredPassword(e.target.value)}
      />
      <button type="button" onClick={createAccount}>
        Create Account
      </button>
      <div className={classes.home_page}>
        <Link to={url.home} className={classes.underline}>
          <div className={classes._button}>Go to Home</div>
        </Link>

        <Link className={classes.underline} to="/login">
          <div className={classes._button}> Login</div>
        </Link>
      </div>
    </form>
  );
};

export default FormSignup;
