import styles from "./Profile.module.scss";
import Header from "../../components/header/Header";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import { useEffect, useState } from "react";
import { getUser, updateUser, updateUserPassword } from "../../api/user";
import { tokenChecker } from "../../utils/token";
import { getGenres } from "../../api/genres";
import Select from "../../components/select/Select";

export const Profile = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState("");
  const [password, setPassword] = useState({old: "", new: ""});
  const [email, setEmail] = useState("");

  useEffect(() => {
    getUser()
      .then(res => profileUpdater(res.data))
      .catch(error => tokenChecker(error));

    getGenres()
      .then(res => setGenres(res.data))
      .catch(error => {
        console.log(error.response);
      });
  }, []);

  useEffect(() => {
  }, [genres])

  const profileUpdater = (data) => {
    setEmail(data.email || "");
    setName(data.name || "");
    setSurname(data.surname || "");
    setGenre(data.favourite_genre || "");
  };

  const submitPasswordChange = () => {
    updateUserPassword( {old_password: password.old, new_password: password.new})
      .then(res => {
        alert('Пароль успешно изменен');
        window.location = "/";
      })
      .catch(error => {
        alert(error.response.data.message);
      })
  };

  const submitProfileUpdate = () => {
    updateUser({
      ...(name && {name: name}),
      ...(surname && {surname: surname}),
      ...(genre && {favourite_genre: genre}),
    })
      .then(res => {
        profileUpdater(res.data);
        window.location = "/";
      })
      .catch(error => {
        console.log(error.response)
      });
  };

  return (
    <div className={styles.Profile}>

      <Header
        title="Мой профиль"
        subtitle="Sky movies"
        type="secondary"
      />
      <div className={styles.Profile__email}>{email}</div>

      <div className={styles.Profile__form}>
        <Input
          type="text"
          value={name}
          placeholder="Имя"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          value={surname}
          placeholder="Фамилия"
          onChange={(e) => setSurname(e.target.value)}
        />

        <Button
          label="Сохранить"
          onClick={submitProfileUpdate}
        />

        <div className={styles.Profile__heading}>Сменить пароль</div>

        <Input
          type="password"
          value={password.old}
          placeholder="Старый пароль"
          onChange={(e) => setPassword({new: password.new, old: e.target.value})}
        />

        <Input
          type="password"
          value={password.new}
          placeholder="Новый пароль"
          onChange={(e) => setPassword({new: e.target.value, old: password.old})}
        />

        <Button
          label="Сохранить"
          onClick={submitPasswordChange}
        />
      </div>
    </div>
  )
}

export default Profile;