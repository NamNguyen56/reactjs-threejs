import "./App.css";
import Scene from "./Scene";
import Office360 from "./Office360";
import Model3D from "./Model3D";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Office360 />} />
        <Route path="/model3d" element={<Model3D />} />
      </Routes>
    </BrowserRouter>

    // <div className="App">
    //   <Scene></Scene>
    //   <Office360></Office360>
    //   <Model3D></Model3D>
    // </div>
  );
}

export default App;
