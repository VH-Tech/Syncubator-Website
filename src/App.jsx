import { useState, useEffect } from "react";
import "./App.css";
import {
  Button,
  Navbar,
  MobileNav,
  IconButton,
  Typography
} from "@material-tailwind/react";
import Navbar2 from "./Components/Navbar2";
import Page1 from "./Components/Page1";
import Page2 from "./Components/Page2";
import Page3 from "./Components/Page3";
import Page4 from "./Components/Page4";
import Page5 from "./Components/Page5";
import Page6 from "./Components/Page6";
import Page7 from "./Components/Page7";
import Footer from "./Components/Footer";
import LoadingScreen from "./Components/LoadingScreen";

function App() {
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      // Start fade-in effect after loading is complete
      setTimeout(() => setFadeIn(true), 50);
    }, 2000); // 2 seconds minimum loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div 
          className={`transition-opacity duration-1000 ${
            fadeIn ? 'opacity-100' : 'opacity-0'
          } hide-scrollbar w-screen flex flex-col bg-white font-poppins`}
        >
          {/* Navbar */}
          <div className="w-full top-0 z-10">
            <Navbar2 />
          </div>

          <div className="sm:mt-16 md:mt-0" id="home">
            <Page1 />
          </div>
          <div id="2">
            <Page2 />
          </div>
          <div id="3">
            <Page3 />
          </div>
          <div id="4">
            <Page4 />
          </div>
          <div id="5">
            <Page5 />
          </div>
          <div id="6">
            <Page6 />
          </div>
          <div id="7">
            <Page7 />
          </div>
          <div id="foot">
            <Footer />
          </div>
        </div>
      )}
    </>
  );
}

export default App;