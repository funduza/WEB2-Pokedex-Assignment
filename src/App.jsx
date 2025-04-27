import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="container" style={{ marginTop: "60px" }}>
        <Outlet />
      </div>
    </>
  );
}

export default App;
