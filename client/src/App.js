<<<<<<< HEAD
<<<<<<< HEAD
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext} from "react";
import { DarkModeContext} from "./context/darkModeContext";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  
  const {darkMode} = useContext(DarkModeContext)

  return (
    <div className={darkMode ? "app dark" : "app"}>
  <BrowserRouter>
    <Routes>
      <Route path="/"> 
      <Route path="/" element={<Home/>} />
      <Route path="login" element={<Login/>}/>
      <Route path="users">
        <Route index element={<List/>}/>
        <Route path=":userId" element={<Single/>}/>
        <Route path="new" element={<New inputs={userInputs} title="Add New User"/>}/>
      </Route>
      <Route path="products">
        <Route index element={<List/>}/>
        <Route path=":productId" element={<Single/>}/>
        <Route path="new" element={<New inputs={productInputs} title="Add New Product"/>}/>
      </Route>
      </Route>
    </Routes>
  </BrowserRouter>
=======
=======
>>>>>>> 6e992757d399b95e35ac1860c7382cc7d4e3abd3
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
<<<<<<< HEAD
>>>>>>> 7209790459bb77c9c695accccdd409d3e71b9f2c
=======
>>>>>>> 6e992757d399b95e35ac1860c7382cc7d4e3abd3
    </div>
  );
}

export default App;
