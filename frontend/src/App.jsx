import { Outlet } from "react-router-dom";
import NavbarMobile from "./components/NavbarMobile";
import "./styles/App.scss";

function App() {
  return (
    <>
      <Outlet />

      <NavbarMobile />
    </>
  );
}

export default App;
