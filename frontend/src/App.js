import './App.scss';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/homepage/Homepage";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Movie from "./pages/movie/Movie";
import Menu from "./components/menu/Menu";

function App() {

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <div className="App__wrapper">
          <Menu />
          <Routes>
            <Route path="/" element={<Homepage />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/profile" element={<Profile />} />

            <Route path="/favorites" element={<List title="Избранное" type="favorites"/>} />
            <Route path="/genre/:id" element={<List title="Жанр" type="genre" />} />
            <Route path="/director/:id" element={<List title="Режиссер" type="director" />} />
            <Route path="/playlist/:id" element={<List title="Плейлист" type="playlist" />} />

            <Route path="/movie/:id" element={<Movie />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
