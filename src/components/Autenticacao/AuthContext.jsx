import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider ({children}){
  const [logado, setLogado] = useState(false);
  const [token, setToken] = useState(sessionStorage.getItem('token') || '');
  const URL_BACKEND = "https://loja-teste-backend.vercel.app/api";
  /* const URL_BACKEND = 'http://localhost:5000/api' */

  return(
    <AuthContext.Provider value={{logado, setLogado, token, setToken, URL_BACKEND}}>
      {children}
    </AuthContext.Provider>
  )
}