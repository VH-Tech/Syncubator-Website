import { useState, useEffect, lazy, Suspense } from "react";
import "./App.css";
import {
  Button,
  Navbar,
  MobileNav,
  IconButton,
  Typography
} from "@material-tailwind/react";
import Navbar2 from "./Components/Navbar2";
import LoadingScreen from "./Components/LoadingScreen";

// Lazy load all pages
const Page1 = lazy(() => import("./Components/Page1"));
const Page2 = lazy(() => import("./Components/Page2"));
const Page3 = lazy(() => import("./Components/Page3"));
const Page4 = lazy(() => import("./Components/Page4"));
const Page5 = lazy(() => import("./Components/Page5"));
const Page6 = lazy(() => import("./Components/Page6"));
const Page7 = lazy(() => import("./Components/Page7"));
const Footer = lazy(() => import("./Components/Footer"));

function App() {
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      // Start fade-in effect after loading is complete
      setTimeout(() => setFadeIn(true), 50);
    }, 300); // 2 seconds minimum loading time

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

          <Suspense fallback={<LoadingScreen />}>
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
          </Suspense>
        </div>
      )}
    </>
  );
}

export default App;