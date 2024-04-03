import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import MyPlaces from "./pages/MyPlaces";
import Favorites from "./pages/Favorites";
import About from "./pages/About";
import NavBar from "./components/header/NavBar";

function App() {
  return (
    <Router>
      <div className="App">
        <footer>
          <NavBar />
        </footer>
        <main>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/myplaces" element={<MyPlaces/>} />
            <Route path="/favorites" element={<Favorites/>} />
            <Route path="/about" element={<About/>} />
          </Routes>
        </main>
        <footer></footer>
      </div>
    </Router>
  );
}

export default App;
