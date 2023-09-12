import { db } from "../firebase/config";
import { createContext } from "react";
import { getAuth } from "firebase/auth";

const AuthContext = createContext(getAuth())

export default AuthContext