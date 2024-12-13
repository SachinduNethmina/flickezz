import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { adminRoutes, publicRoutes } from "./routes/routes";
import { AuthContextProvider } from "./context/AuthContext";

const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          {publicRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
          {adminRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
