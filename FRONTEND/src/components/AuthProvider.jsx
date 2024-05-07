import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    // Effectuez ici votre logique de connexion, par exemple une requête à l'API
    // Assurez-vous de stocker les informations utilisateur dans l'état
    const userData = await fetchUserData(email, password);
    setUser(userData);
    return userData;
  };

  // Méthode pour se déconnecter
  const logout = async () => {
    // Effectuez ici votre logique de déconnexion, par exemple une requête à l'API
    // Assurez-vous de supprimer les informations utilisateur de l'état
    setUser(null);
  };

  // Fonction pour récupérer les informations sur l'utilisateur
  const getUser = () => user;

  return (
    <AuthContext.Provider value={{ user, login, logout, getUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Fonction de requête pour récupérer les données utilisateur depuis le backend
const fetchUserData = async (email, password) => {
  // Exemple fictif de requête à l'API
  const response = await fetch("http://example.com/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la connexion");
  }

  const userData = await response.json();
  return userData;
};
