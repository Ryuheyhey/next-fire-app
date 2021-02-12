import firebase from "firebase/app";
import { FC, createContext, useEffect, useState } from "react";
import { auth } from "../utils/firebase";

type User = firebase.User;

type AuthContextProps = {
  currentUser: User | null | undefined;
};

type CurrentUser = User | null | undefined;

const AuthContext = createContext<AuthContextProps>({
  currentUser: undefined,
});

const AuthProvider: FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(undefined);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
