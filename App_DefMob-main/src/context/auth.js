import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../database/index";
import app from "../database/index";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import Toast from 'react-native-toast-message';

const AuthContext = createContext({});
const themeContext = createContext();
export default themeContext;

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState();
  const [isLoading, setisLoading] = useState(true);
  const authen = getAuth(app);
  const firestore = getFirestore(app);

  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData() {
    try {
      const authDataSerialized = await AsyncStorage.getItem("@AuthData");
      if (authDataSerialized) {
        const _authData = JSON.parse(authDataSerialized);
        setAuthData(_authData);
      }
    } catch (error) {
    } finally {
      setisLoading(false);
    }
  }

  async function Login(email, senha) {
    try {
      const authData = await signInWithEmailAndPassword(auth, email, senha);
      const user = authData.user;

      setAuthData(authData);
      await AsyncStorage.setItem("@AuthData", JSON.stringify(authData));
      await AsyncStorage.setItem("userID", user.uid);

      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Login efetuado com sucesso',
        visibilityTime: 3000,
      });

    } catch (error) {
      let errorMessage = 'Erro durante o login';
      if (error.code === 'auth/invalid-login-credentials') {
        errorMessage = 'Credenciais inválidas';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Erro de conexão. Verifique sua conexão com a internet.';
      }

      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: errorMessage,
        visibilityTime: 3000,
      });

      throw error;
    }
  }

  async function Logout() {
    try {
      await signOut(auth);
      setAuthData(undefined);

      await AsyncStorage.removeItem("@AuthData");
      await AsyncStorage.removeItem("userID");

      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Logout realizado com sucesso',
        visibilityTime: 3000,
      });

    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Erro durante o logout',
        visibilityTime: 3000,
      });
      throw error;
    }
  }

  async function registerUser(userData) {
    try {
      const authData = await createUserWithEmailAndPassword(
        authen,
        userData.email,
        userData.senha
      );

      await updateProfile(authData.user, {
        displayName: userData.nome_completo,
      });

      const user = authData.user;
      const userRef = collection(firestore, "usuarios");
      const docRef = await addDoc(userRef, {
        nome_completo: userData.nome_completo,
        email: userData.email,
        deficiencia: userData.deficiencia,
        userId: user.uid,
        telefone: userData.telefone,
        genero: userData.genero,
        cpf: userData.cpf,
        foto_perfil: userData.foto_perfil,
      });

      setAuthData(authData);
      AsyncStorage.setItem("@AuthData", JSON.stringify(authData));
      AsyncStorage.setItem("userID", user.uid);

      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Usuário cadastrado com sucesso',
        visibilityTime: 3000,
      });

    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Erro durante o registro',
        visibilityTime: 3000,
      });
      throw error;
    }
  }

  const contextValue = useMemo(() => ({
    authData,
    Login,
    Logout,
    registerUser,
    isLoading
  }), [authData, Login, Logout, registerUser, isLoading])

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuth deve ser usado dentro de um AuthProvider");
  }

  return context;
}
