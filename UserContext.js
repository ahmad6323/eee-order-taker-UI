// UserContext.js
import React, { createContext, useContext, useState } from "react";

// Create a new context for user
export const UserContext = createContext();

// // Custom hook to use the user context
// export const useUser = () => useContext(UserContext);

// // User context provider component
// export const UserProvider = ({ children }) => {
//   // State to store user
//   const [user, setUser] = useState(null);

//   // Context value
//   const value = {
//     user,
//     setUser,
//   };

//   // Provide the context value to children components
//   return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
// };
