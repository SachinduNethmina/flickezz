import { createContext, useContext, useEffect, useState } from "react";
import useGetLoggedUser from "../hooks/useGetLoggedUser";
import Loading from "../components/Loading";

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

  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState(null);
  const { getLoggedUser } = useGetLoggedUser();
  useEffect(() => {
    const load = async () => {
      const user = await getLoggedUser();
      if (user) {
        setUser(user);
      }
      setIsLoading(false);
    };
    load();
  }, []);

  const logout = async () => {
    localStorage.clear();
    setUser(null);
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
        user,
        setUser,
        isLoading,
        logout,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
