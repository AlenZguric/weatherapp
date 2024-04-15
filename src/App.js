import { BrowserRouter , Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import MyPlaces from "./pages/MyPlaces";
import Favorites from "./pages/Favorites";
import About from "./pages/About";
import NavBar from "./components/header/NavBar";
import CityDetails from "./components/main/CityDetails";
import CityListWeather from "./components/main/CityListWeather";
import CopyRight from "./components/footer/CopyRight";

function App() {


  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <NavBar />
        </header>
        <main>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/myplaces" element={<MyPlaces/>} />
            <Route path="/favorites" element={<Favorites/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/citys/:cityName" element={<CityDetails />} />

            <Route path='/citys/:cityName' element={<CityDetails />} />
            <Route path="/citylistweather" element={<CityListWeather />} />
          </Routes>
        </main>
        <footer>
          <CopyRight/>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
