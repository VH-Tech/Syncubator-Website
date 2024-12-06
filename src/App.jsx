import { useState, useEffect, Suspense, lazy } from "react";
import "./App.css";
import {
  Button,
  Navbar,
  MobileNav,
  IconButton,
  Typography
} from "@material-tailwind/react";
import LoadingScreen from "./Components/LoadingScreen";

// Lazy load all pages
const Navbar2 = lazy(() => import("./Components/Navbar2"));
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
    // Reduced loading time to 100ms
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => setFadeIn(true), 50);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Component loading fallback
  const ComponentFallback = () => (
    <div className="w-full h-32 animate-pulse bg-gray-200"></div>
  );

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
          <Suspense fallback={<ComponentFallback />}>
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
          </Suspense>
        </div>
      )}
    </>
  );
}

export default App;