import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./FormLogin.module.css";
import url from "../../utils/url";

const FormLogin = () => {
  const navigate = useNavigate();
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [error, setError] = useState(null);

  const loginAccount = async () => {
    setError(null);
    try {
      const res = await fetch(url.root + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
        }),
      });
      const data = await res.json();
      if (data.message === "Login failed!") {
        throw new Error(data.err);
      }
      localStorage.setItem("currentUser", JSON.stringify(data.user));
      navigate("/");
    } catch (err) {
      setError({ message: err.message });
    }
  };

  return (
    <React.Fragment>
      <div className={classes.container}>
        <form className={classes.form}>
          <h1>Login</h1>
          {error && <p style={{ color: "red" }}>{error.message}</p>}
          <input
            type="email"
            placeholder="Your email..."
            value={enteredEmail}
            onChange={(e) => setEnteredEmail(e.target.value)}
          />{" "}
          <br />
          <input
            type="password"
            placeholder="Your password..."
            value={enteredPassword}
            onChange={(e) => setEnteredPassword(e.target.value)}
          />{" "}
          <br />
          <button type="button" onClick={loginAccount}>
            Login
          </button>
          <div className={classes.home_page}>
            <Link to={url.home} className={classes.underline}>
              <div className={classes._button}>Go to Home</div>
            </Link>

            <Link to={`${url.home}/signup`} className={classes.underline}>
              <div className={classes._button}>Signup</div>
            </Link>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default FormLogin;
