import styles from "./Register.module.scss";
import { useState } from "react";
import { registerUser } from "../../api/auth";
import { authorization } from "../../api/requests";
import Input from "../../components/input/Input";
import Checkbox from "../../components/checkbox/Checkbox";
import Button from "../../components/button/Button";

export const Register = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(undefined);

  const submitRegistration = () => {
    registerUser({email: login, password: password})
      .then(() => {
        authorization(login, password, (message) => {
          setErrorMsg(message);
        });
      })
      .catch(error => {
        setErrorMsg([error.response?.data?.message]);
      });
  };

  return (
    <div className={styles.Register}>
      <h1>Регистрация</h1>
      <span>Логин, пароль и вы с нами</span>

      <div className={styles.Register__form}>

        {errorMsg &&
          <div className={styles.Register__message}>{errorMsg}</div>
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

        <Checkbox
          label="Запомнить меня"
        />

        <Button
          label="Регистрация"
          onClick={submitRegistration}
        />

      </div>
    </div>
  )
}

export default Register;