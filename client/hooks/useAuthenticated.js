import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

export const useAuthenticated = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        const currentDate = new Date();
        // JWT exp es en segundos
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
          console.log("Token expirado");
          setIsAuthenticated(false);
        } else {
          console.log("Token válido");
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log("Error al decodificar el token");
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return isAuthenticated;
};
