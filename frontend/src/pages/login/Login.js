import styles from "./Login.module.scss";
import { useState } from "react";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import {authorization} from "../../api/requests";

export const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(undefined);

  const submitLogin = () => {
    authorization(login, password, (message) => {
      setErrorMsg(message);
    });
  }

  return (
    <div className={styles.Login}>
      <h1>Войти</h1>
      <span>Помните свой пароль? Забегайте!</span>

      <div className={styles.Login__form}>

        {errorMsg &&
          <div className={styles.Login__message}>{errorMsg}</div>
        }

        <Input
          type="text"
          value={login}
          placeholder="Логин"
          onChange={(e) => {
            setErrorMsg(undefined);
            setLogin(e.target.value);
          }}
        />

        <Input
          type="password"
          value={password}
          placeholder="Пароль"
          onChange={(e) => {
            setErrorMsg(undefined);
            setPassword(e.target.value);
          }}
        />

        <Button
          label="Войти"
          onClick={submitLogin}
        />
      </div>
    </div>
  )
}

export default Login;