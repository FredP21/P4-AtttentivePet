import { useMediaQuery } from "@uidotdev/usehooks";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import Navbar from "./components/Navbar";
import NavbarMobile from "./components/NavbarMobile";
import "./styles/App.scss";

function App() {
  const isMediumScreen = useMediaQuery("only screen and (max-width: 850px)");
  return isMediumScreen ? (
    <>
      <Outlet />
      <Toaster />
      <NavbarMobile />
    </>
  ) : (
    <>
      <Navbar />
      <Outlet />
      <Toaster />
    </>
  );
}

export default App;
