import { useMediaQuery } from "@uidotdev/usehooks";
import { Outlet } from "react-router-dom";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import NavbarMobile from "./components/NavbarMobile";
import "./styles/App.scss";

function App() {
  const isMediumScreen = useMediaQuery("only screen and (max-width: 850px)");
  return isMediumScreen ? (
    <>
      <Outlet />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Flip}
      />
      <NavbarMobile />
    </>
  ) : (
    <>
      <Navbar />
      <Outlet />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="colored"
        transition={Flip}
      />
    </>
  );
}

export default App;
