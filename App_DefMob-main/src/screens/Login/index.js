import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter";
import styles from "./style";
import { useAuth } from "../../context/auth";
import Toast from "react-native-toast-message";
import Logo from "../../../assets/MOOB.svg";

export default function Login() {
  const { Login } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigation = useNavigation();

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    if (!email || !senha) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Por favor, preencha todos os campos.",
        visibilityTime: 3000,
      });
      return;
    }

    if (!isValidEmail(email)) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Formato de email inválido.",
        visibilityTime: 3000,
      });
      return;
    }
    Login(email, senha);
  };

  const [fontLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  if (!fontLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar/>
      <ScrollView>
        <Animatable.View
          style={styles.containerHeader}
          animation="fadeInLeft"
          delay={500}
        >
          <Logo style={styles.logo} width={100} height={100} />
          <Text style={styles.title}>Bem-vindo(a)</Text>
          <Text style={styles.subTitle}>Entre na sua conta MOOB!</Text>
        </Animatable.View>

        <Animatable.View style={styles.form} animation="fadeInUp">
          <View style={[styles.inputIcon, styles.input]}>
            <Image
              source={require("../../../assets/icons/email.png")}
              style={{ marginRight: "2.5%", width: 25, height: 25 }}
              />
            <TextInput
              style={{ width: "100%", fontSize: 16, fontFamily: "Inter_400Regular" }}
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={[styles.inputIcon, styles.input]}>
            <Image
              source={require("../../../assets/icons/senha.png")}
              style={{ marginRight: "2.5%", width: 25, height: 25 }}
              />
            <TextInput
              style={{ width: "100%", fontSize: 16, fontFamily: "Inter_400Regular" }}
              placeholder="Senha"
              secureTextEntry={true}
              value={senha}
              onChangeText={(text) => setSenha(text)}
            />
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.buttonTextLog}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.formatInputButton, styles.registerButton]}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.buttonText}>Criar uma conta</Text>
          </TouchableOpacity>
          <View style={styles.orContainer}>
            <View style={styles.line}></View>
            <Text style={styles.orText}>Ou</Text>
            <View style={styles.line}></View>
          </View>
          <TouchableOpacity style={styles.loginGoogle}>
            <Image
              source={require("../../../assets/icons/google-logo.png")}
              resizeMode="contain"
            />
            <Text style={styles.textLoginGoogle}>Entrar com uma conta Google</Text>
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>
    </SafeAreaView>
  );
}
