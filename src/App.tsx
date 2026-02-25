// // App.tsx
// // import React from "react";
// import { Routes, Route } from "react-router-dom";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

// import Home from "./pages/Home";
// import Portfolio from "./pages/Portfolio";
// import Capabilities from "./pages/Capabilities";
// import Contact from "./pages/ContactSection";
// import AboutUs from "./pages/About";
// import About from "./pages/AboutUs";
// import Media from "./pages/Media";
// import PremiumCoachModels from "./pages/PremiumCoachModels";
// import RequestQuote from "./pages/RequestQuote";
// import AdvancedTechnologies from "./pages/AdvancedTechnologies";
// import AppointmentPage from "./pages/AppointmentPage";

// import LoginModal from "./components/LoginModal";
// import RegisterModal from "./components/RegisterModal";

// import HRMSPage from "./pages/HRMSpage";

// type ModalState = "none" | "normal" | "register";

// function App() {
//   const [modalState, setModalState] = useState<ModalState>("none");

//   const closeAll = () => setModalState("none");
//   const openLogin = () => setModalState("normal");
//   const openRegister = () => setModalState("register");

//   const navigate = useNavigate();

//   const openHRMS = () => {
//     closeAll();
//     navigate("/hrms");
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-white text-gray-900">
//       {/* Navbar */}
//       <Navbar
//         onLoginClick={openLogin}
//         onRegisterClick={openRegister}
//         onHRMSClick={openHRMS}
//       />

//       {/* Main Content */}
//       <main className="flex-grow">
//         {/* <main className="flex-grow pt-16"> */}
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/crestline/portfolio" element={<Portfolio />} />
//           <Route path="/crestline/capabilities" element={<Capabilities />} />
//           <Route path="/crestline/contact" element={<Contact />} />
//           <Route path="/crestline/about" element={<AboutUs />} />
//           <Route path="/crestline/aboutus" element={<About />} />
//           <Route
//             path="/crestline/technology"
//             element={<AdvancedTechnologies />}
//           />
//           <Route path="/crestline/media" element={<Media />} />
//           <Route path="/crestline/vehicles" element={<PremiumCoachModels />} />
//           <Route path="/crestline/requestquote" element={<RequestQuote />} />
//           <Route path="/crestline/appointment" element={<AppointmentPage />} />
//           <Route path="/hrms" element={<HRMSPage />} />
//         </Routes>
//       </main>

//       {/* Footer */}
//       <Footer />
//       <LoginModal
//         isOpen={modalState === "normal"}
//         onClose={closeAll}
//         // onLoginSuccess={handleLoginSuccess}
//         // onSwitchToRegister={() => {
//         //   setModalState("register");
//         // }}
//         onSwitchToHRMSLogin={openHRMS}
//       />
//     </div>
//   );
// }

// export default App;


import { Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginModal from "./components/LoginModal";

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
import HRMSPage from "./pages/HRMSpage";

type ModalState = "none" | "normal";

function App() {
  const [modalState, setModalState] = useState<ModalState>("none");
  const [appUrl, setAppUrl] = useState<string | null>(null);

  const navigate = useNavigate();

  const closeAll = () => setModalState("none");
  const openLogin = () => setModalState("normal");

  const openHRMS = () => {
    closeAll();
    navigate("/hrms");
  };

  // 🔥 REQUIRED FUNCTION
  const handleLoginSuccess = (role: string) => {
    console.log("ROLE RECEIVED:", role);
  closeAll();

    const normalizedRole = role.toLowerCase();
      console.log("NORMALIZED ROLE:", normalizedRole);


  if (normalizedRole === "admin") {
    // setAppUrl("http://localhost:5173/admin");
    setAppUrl("https://flowracle.sts-test.site/admin");
  } else if (normalizedRole === "employee") {
    // setAppUrl("http://localhost:5173/employee");
     setAppUrl("https://flowracle.sts-test.site/employee");
  }
};
  const handleLogout = () => {
    setAppUrl(null); // Remove the iframe
    navigate("/"); // Go to website home
  };
  

  // 🔥 If logged in → show iframe
  if (appUrl) {
    return (
      <iframe
        src={appUrl}
        className="w-full h-screen"
        style={{ border: "none" }}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <Navbar
        onLoginClick={openLogin}
        onHRMSClick={openHRMS}
      />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crestline/portfolio" element={<Portfolio />} />
          <Route path="/crestline/capabilities" element={<Capabilities />} />
          <Route path="/crestline/contact" element={<Contact />} />
          <Route path="/crestline/about" element={<AboutUs />} />
          <Route path="/crestline/aboutus" element={<About />} />
          <Route path="/crestline/technology" element={<AdvancedTechnologies />} />
          <Route path="/crestline/media" element={<Media />} />
          <Route path="/crestline/vehicles" element={<PremiumCoachModels />} />
          <Route path="/crestline/requestquote" element={<RequestQuote />} />
          <Route path="/crestline/appointment" element={<AppointmentPage />} />
          <Route path="/hrms" element={<HRMSPage />} />
        </Routes>
      </main>

      <Footer />

      <LoginModal
        isOpen={modalState === "normal"}
        onClose={closeAll}
        onLoginSuccess={handleLoginSuccess}  
      />
    </div>
  );
}

export default App;