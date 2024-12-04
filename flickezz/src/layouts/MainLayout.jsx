import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SignInModal from "../components/SignInModal";
import { useAuthContext } from "../context/AuthContext";

const MainLayout = ({ children }) => {
  const location = useLocation();
  const { setIsNavbarOpen } = useAuthContext();

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsNavbarOpen(false);
  }, [location]);

  return (
    <div className="bg-black">
      <Header />
      {children}
      <Footer />
      <SignInModal />
    </div>
  );
};

export default MainLayout;
