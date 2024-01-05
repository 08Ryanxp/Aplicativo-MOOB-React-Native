import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import * as Animatable from "react-native-animatable";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter";

export default function RecoverPassword() {
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

  return (
    <SafeAreaView>
      <StatusBar />

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("ForgotPassword")}
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
          <Text style={styles.title}>Alterar senha</Text>
          <Text style={styles.subTitle}>
            Sua senha deve conter no mínimo 8 e no máximo 20 caracteres
            incluindo letras minúsculas, maiúsculas e números.
          </Text>
        </Animatable.View>
        <Animatable.View animation="fadeInUp" style={styles.form}>
          <Text style={styles.label}>Nova senha</Text>
          <View style={[styles.inputIcon, styles.input]}>
            <Image
              source={require("../../../assets/icons/senha.png")}
              style={{ marginRight: "2.5%", width: 25, height: 25 }}
            />
            <TextInput
              style={{ width: "100%", fontSize: 16 }}
              placeholder="Digite sua nova senha"
            />
          </View>
          <Text style={styles.label}>Confirme a senha</Text>
          <View style={[styles.inputIcon, styles.input]}>
            <Image
              source={require("../../../assets/icons/senha.png")}
              style={{ marginRight: "2.5%", width: 25, height: 25 }}
            />
            <TextInput
              style={{ width: "100%", fontSize: 16 }}
              placeholder="Repita a senha"
            />
          </View>

          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.textButton}>Continuar</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </SafeAreaView>
  );
}
