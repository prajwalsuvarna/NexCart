import { useState, useContext, createContext,useEffect } from "react";
const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (auth) {
      setAuth({
        ...auth,
        user:auth.user,
        token:auth.token
      });
    }
  }, [auth]);
  return (
    <AuthContext.Provider value={[ auth, setAuth ]}>
      {children}
    </AuthContext.Provider>
  );
};

//custom hooks

const useAuth = () => useContext(AuthContext);

export {useAuth,AuthProvider}
