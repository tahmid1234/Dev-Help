import React, { useState } from "react";

const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const [CurrentUser, setCurrentUser] = useState({});
  const [IsLoggedIn, setIsLoggedIn] = useState(false);
  const [logInStatus,setLogInStatus] = useState(true)

  return (
    <AuthContext.Provider
      value={{
        CurrentUser,
        setCurrentUser,
        IsLoggedIn,
        setIsLoggedIn,
        logInStatus,
        setLogInStatus
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };