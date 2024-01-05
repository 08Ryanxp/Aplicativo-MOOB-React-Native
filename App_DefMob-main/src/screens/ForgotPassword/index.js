import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
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
import { auth } from "../../database/index";
import { sendPasswordResetEmail } from "firebase/auth";
import styles from "./style";
import Toast from "react-native-toast-message";

export default function ForgotPassword() {
  const [Email, setEmail] = useState("");
  const navigation = useNavigation();
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

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const replacePass = () => {
    if (!isValidEmail(Email)) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Formato de email inválido.",
        visibilityTime: 3000,
      });
      return;
    }

    if (Email !== "") {
      console.log(Email);
      sendPasswordResetEmail(auth, Email)
        .then((r) => {
          Alert.alert(
            "Email de recuperação enviado!",
            "Vá ao seu E-mail e verifique a caixa de entrada.",
            [{ text: "OK", onPress: () => navigation.navigate("Login") }]
          );
        })
        .catch((e) => {
          console.error("replacePass: erro em recover:" + e);
          switch (e.code) {
            case "auth/user-not-found":
              Alert.alert("Erro", "Usuário não cadastrado.");
              break;
            case "auth/invalid-email":
              Alert.alert("Erro", "Email inválido.");
              break;
            case "auth/user-disabled":
              Alert.alert("Erro", "Usuário desabilitado.");
              break;
          }
        });
    } else {
      Alert.alert("Erro", "Por favor, digite seu email cadastrado.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar/>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Image
          source={require("../../../assets/icons/icon-voltar.png")}
          resizeMode="contain"
          style={styles.backIcon}
        />
        <Text style={styles.textIcon}>Voltar</Text>
      </TouchableOpacity>

      <Animatable.View
        animation="fadeInLeft"
        delay={500}
        style={styles.containerHeader}
      >
        <Text style={styles.title}>Redefinir senha</Text>
        <Text style={styles.subTitle}>Esqueceu sua senha?</Text>
        <Text style={styles.description}>
          Para conseguir alterar sua senha insira o e-mail cadastrado na conta
          no campo abaixo.
        </Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.form}>
        <View style={[styles.inputIcon, styles.input]}>
          <Image
            source={require("../../../assets/icons/email.png")}
            style={{ marginRight: "2.5%", width: 25, height: 25 }}

          />
          <TextInput
            style={{ width: "100%", fontSize: 16 }}
            placeholder="Digite seu email"
            keyboardType="email-address"
            returnKeyType="go"
            value={Email}
            onChangeText={(text) => setEmail(text)}
            autoFocus={true}
          />
        </View>
        <TouchableOpacity style={styles.continueButton}>
          <Text style={[styles.textButton]} onPress={replacePass}>
            Continuar
          </Text>
        </TouchableOpacity>

      </Animatable.View>
    </SafeAreaView>
  );
}
