// App.tsx
// import React from "react";
import { Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Capabilities from "./pages/Capabilities";
import Contact from "./pages/ContactSection";
import AboutUs from "./pages/About";
import About from "./pages/AboutUs";
import Media from "./pages/Media";
import PremiumCoachModels from "./pages/PremiumCoachModels";
import RequestQuote from "./pages/RequestQuote";
import AdvancedTechnologies from "./pages/AdvancedTechnologies";
import AppointmentPage from "./pages/AppointmentPage";

import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";

import HRMSPage from "./pages/HRMSpage";

type ModalState = "none" | "normal" | "register";

function App() {
  const [modalState, setModalState] = useState<ModalState>("none");

  const closeAll = () => setModalState("none");
  const openLogin = () => setModalState("normal");
  const openRegister = () => setModalState("register");

  const navigate = useNavigate();

  const openHRMS = () => {
    closeAll();
    navigate("/hrms");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <Navbar
        onLoginClick={openLogin}
        onRegisterClick={openRegister}
        onHRMSClick={openHRMS}
      />

      {/* Main Content */}
      <main className="flex-grow">
        {/* <main className="flex-grow pt-16"> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crestline/portfolio" element={<Portfolio />} />
          <Route path="/crestline/capabilities" element={<Capabilities />} />
          <Route path="/crestline/contact" element={<Contact />} />
          <Route path="/crestline/about" element={<AboutUs />} />
          <Route path="/crestline/aboutus" element={<About />} />
          <Route
            path="/crestline/technology"
            element={<AdvancedTechnologies />}
          />
          <Route path="/crestline/media" element={<Media />} />
          <Route path="/crestline/vehicles" element={<PremiumCoachModels />} />
          <Route path="/crestline/requestquote" element={<RequestQuote />} />
          <Route path="/crestline/appointment" element={<AppointmentPage />} />
          <Route path="/hrms" element={<HRMSPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
      <LoginModal
        isOpen={modalState === "normal"}
        onClose={closeAll}
        // onLoginSuccess={handleLoginSuccess}
        // onSwitchToRegister={() => {
        //   setModalState("register");
        // }}
        onSwitchToHRMSLogin={openHRMS}
      />
    </div>
  );
}

export default App;
