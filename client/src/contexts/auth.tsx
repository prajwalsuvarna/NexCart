import { useState, useContext, createContext,useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    if (authData && authData!==auth) {
      setAuth({
        ...auth,
        user:authData.user,
        token:authData.token
      });
    }
  // }, [auth]);--> value may be same,but object reference is different,so the useEffect will be called again and again
  }, []);
  return (
    <AuthContext.Provider value={[ auth, setAuth ]}>
      {children}
    </AuthContext.Provider>
  );
};

//custom hooks

const useAuth = () => useContext(AuthContext);

export {useAuth,AuthProvider}
