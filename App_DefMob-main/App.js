import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/context/auth";
import ProtectedRoutes from "./src/routes/ProtectedRoutes";
import Toast from "react-native-toast-message";
import { PaperProvider, DefaultTheme } from 'react-native-paper';

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    surfaceVariant: '#C5DDFF',
    primary: '#2D68FF',
  },
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <PaperProvider theme={customTheme}>
          <ProtectedRoutes />
        </PaperProvider>
      </NavigationContainer>
      <Toast />
    </AuthProvider>
  );
}
