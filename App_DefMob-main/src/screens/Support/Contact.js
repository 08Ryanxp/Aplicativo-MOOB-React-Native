import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/inter";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Logo from "../../../assets/MOOB.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import styles from "./style_contact";

export default function Contact() {
  const navigation = useNavigation();
  const [nome, setNome] = useState("");
  const [nomeErro, setNomeErro] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [Email, setEmail] = useState("");
  const [fontLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  const enviarMensagem = () => {
    if (nome.trim() === "") {
      setNomeErro("Digite seu nome completo.");
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Digite seu nome completo.",
        visibilityTime: 3000,
      });
    } else if (mensagem.trim() === "") {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Digite uma mensagem válida.",
        visibilityTime: 3000,
      });
    } else {
      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Suporte",
        text2: "Mensagem enviada com sucesso",
        visibilityTime: 3000,
      });
    }
  };

  const caracteresRestantes = 0 + mensagem.length;

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
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar/>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.containerProfile}>
          <View style={styles.rowProfile}>
            <TouchableOpacity
              style={styles.buttonBack}
              onPress={() => navigation.navigate("Perfil")}
            >
              <Image
                source={require("../../../assets/icons/icon-voltar.png")}
                style={styles.iconBack}
              />
              <Text style={styles.textIcon}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.containerHeader}>
          <Logo style={styles.logo} width={100} height={100} />
          <Text style={styles.title}>Fale conosco</Text>
        </View>

        <View style={styles.containerData}>
          <TextInput
            placeholder="Nome completo"
            returnKeyType="go"
            style={styles.input}
            onChangeText={(text) => {
              setNome(text);
              setNomeErro("");
            }}
          />
          {nomeErro !== "" && (
            <Text style={styles.errorMessage}>{nomeErro}</Text>
          )}

          <View style={styles.input}>
            <TextInput
              style={{ width: "100%", fontSize: 16 }}
              placeholder="Email"
              keyboardType="email-address"
              returnKeyType="go"
              value={Email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
        </View>
        <View style={styles.containerBox}>
          <View style={styles.mensagemBox}>
            <TextInput
              style={styles.mensagemInput}
              placeholder="Digite sua mensagem..."
              onChangeText={(text) => setMensagem(text)}
              value={mensagem}
              multiline
              maxLength={300}
            />
            <Text style={styles.contadorCaracteres}>
              {caracteresRestantes} / 300
            </Text>
          </View>

          <View style={styles.containerInfo}>
            <Text style={styles.textInfo1}>
              Ao clicar em enviar, você concorda que o MOOB pode analisar dados
              de desempenho e diagnóstico para tentar resolver o problema
              relatado.
            </Text>

            <Text style={styles.textInfo2}>
              Enviaremos uma resposta para o seu email.
            </Text>
          </View>
          <TouchableOpacity onPress={enviarMensagem} style={styles.enviarBtn}>
            <Text style={styles.enviarBtnText} onPress={replacePass}>
              Enviar mensagem
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
