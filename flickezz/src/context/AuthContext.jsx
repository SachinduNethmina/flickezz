import { createContext, useContext, useState } from "react";

const authContext = createContext();
export const useAuthContext = () => useContext(authContext);

export const AuthContextProvider = ({ children }) => {
  const [signInModal, setSignInModal] = useState(null);
  const [registerOpened, setRegisterOpened] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const toggleSignInModal = (registerOpened = false) => {
    setRegisterOpened(registerOpened);
    signInModal.toggle();
    setIsNavbarOpen(false);
  };

  return (
    <authContext.Provider
      value={{
        signInModal,
        setSignInModal,
        toggleSignInModal,
        registerOpened,
        setRegisterOpened,
        isNavbarOpen,
        setIsNavbarOpen,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
