import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StyleSheet,
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
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/auth";
import Toast from "react-native-toast-message";
import styles from "./style";
import Logo from "../../../assets/MOOB.svg";
import {
  Dialog,
  Portal,
  Button,
  Paragraph,
  Title,
  Checkbox,
} from "react-native-paper";

export default function Register() {
  const [userData, setUserData] = useState({
    nome_completo: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    deficiencia: "",
    telefone: "",
    genero: "",
    cpf: "",
    foto_perfil: "",
  });
  const [checked, setChecked] = useState("unchecked");
  const { registerUser } = useAuth();
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);

  const showToast = (message, messageTwo) => {
    Toast.show({
      type: "error",
      position: "bottom",
      text1: message,
      text2: messageTwo,
      visibilityTime: 4000,
    });
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

  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingHorizontal: 8,
      paddingVertical: 13,
      borderWidth: 0,
      borderColor: "gray",
      borderRadius: 50,
      color: "black",
      paddingRight: 30,
      backgroundColor: "#E2EEFF",
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 8,
      paddingVertical: 13,
      borderWidth: 0,
      borderColor: "gray",
      borderRadius: 50,
      color: "black",
      paddingRight: 30,
      backgroundColor: "#E2EEFF",
    },
    placeholder: {
      color: "#00000060",
    },
    iconContainer: {
      top: 20,
      right: 15,
    },
  });

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const isValidSenha = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = () => {
    if (
      !userData.nome_completo ||
      !userData.email ||
      !userData.senha ||
      !userData.confirmarSenha ||
      !userData.deficiencia
    ) {
      showToast("Campos Obrigatórios", "Preencha os campos obrigatórios.");
      return;
    }

    if (!isValidEmail(userData.email)) {
      showToast("Email Inválido", "Formato de e-mail inválido.");
      return;
    }

    if (!isValidSenha(userData.senha)) {
      showToast(
        "Senha Inválida",
        "Deve conter 8 caracteres ou mais, incluindo A-Z / a-z e números"
      );
      return;
    }

    if (userData.senha !== userData.confirmarSenha) {
      showToast(
        "Senhas Não Coincidem",
        "Verifique se digitou corretamente as senhas."
      );
      return;
    }

    if (checked !== "checked") {
      showToast(
        "Politica de Privacidade",
        "Você precisa concordar com a Política de Privacidade."
      );
      return;
    }
    registerUser(userData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar/>
      <Animatable.View animation="fadeInLeft">
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
      </Animatable.View>

      <Animatable.View style={styles.logo} animation="fadeInLeft">
        <Logo width={100} height={100} />
      </Animatable.View>

      <Animatable.View
        style={styles.containerHeader}
        animation="fadeInLeft"
        delay={500}
      >
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Crie sua conta </Text>
          <Text style={styles.spanTitle}>MOOB</Text>
        </View>
        <Text style={styles.subTitle}>Preencha seus dados abaixo</Text>
      </Animatable.View>

      <Animatable.View style={styles.form} animation="fadeInUp">
        <View style={[styles.inputIcon, styles.input]}>
          <Image
            source={require("../../../assets/icons/nome.png")}
            style={{ marginRight: "2.5%", width: 25, height: 25 }}

          />
          <TextInput
            value={userData.nome_completo}
            onChangeText={(text) =>
              setUserData({ ...userData, nome_completo: text })
            }
            style={{ width: "100%", fontSize: 16 }}
            placeholder="Nome completo"
          ></TextInput>
        </View>

        <View style={[styles.inputIcon, styles.input]}>
          <Image
            source={require("../../../assets/icons/email.png")}
            style={{ marginRight: "2.5%", width: 25, height: 25 }}

          />
          <TextInput
            value={userData.email}
            onChangeText={(text) => setUserData({ ...userData, email: text })}
            style={{ width: "100%", fontSize: 16 }}
            placeholder="Email"
          ></TextInput>
        </View>

        <View style={[styles.inputIcon, styles.input]}>
          <Image
            source={require("../../../assets/icons/senha.png")}
            style={{ marginRight: "2.5%", width: 25, height: 25 }}

          />
          <TextInput
            secureTextEntry
            value={userData.senha}
            onChangeText={(text) => setUserData({ ...userData, senha: text })}
            style={{ width: "100%", fontSize: 16 }}
            placeholder="Senha"
          ></TextInput>
        </View>

        <View style={[styles.inputIcon, styles.input]}>
          <Image
            source={require("../../../assets/icons/senha.png")}
            style={{ marginRight: "2.5%", width: 25, height: 25 }}

          />
          <TextInput
            secureTextEntry
            value={userData.confirmarSenha}
            onChangeText={(text) =>
              setUserData({ ...userData, confirmarSenha: text })
            }
            style={{ width: "100%", fontSize: 16 }}
            placeholder="Confirmar senha"
          ></TextInput>
        </View>

        <View style={[styles.formatDropdown, styles.inputIcon]}>
          <Image source={require("../../../assets/icons/dropdown.png")}
            style={{ marginRight: "1%", width: 25, height: 25 }} />
          <RNPickerSelect
            onValueChange={(value) =>
              setUserData({ ...userData, deficiencia: value })
            }
            items={[
              { label: "Paraplegia", value: "paraplegia" },
              { label: "Paraparesia", value: "paraparesia" },
              { label: "Monoplegia", value: "Monoplegia" },
              { label: "Monoparesia", value: "Monoparesia" },
              { label: "Tetraplegia", value: "Tetraplegia" },
              { label: "Tetraparesia", value: "Tetraparesia" },
              { label: "Triplegia", value: "Triplegia" },
              { label: "Hemiplegia", value: "Hemiplegia" },
              { label: "Hemiparesia", value: "Hemiparesia" },
              { label: "Ostomia", value: "Ostomia" },
              {
                label: "Amputação ou ausência de membro",
                value: "Amputação ou ausência de membro",
              },
              { label: "Paralisia cerebral", value: "Paralisia cerebral" },
              { label: "nanismo", value: "nanismo" },
              {
                label: "Deformidade congênita ou adquirida",
                value: "Deformidade congênita ou adquirida",
              },
            ]}
            placeholder={{ label: "Selecione uma deficiência", value: null }}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
          />
        </View>

        <View style={styles.ContainerCheckbox}>
          <Checkbox
            value="checked"
            status={checked === "checked" ? "checked" : "unchecked"}
            onPress={() =>
              setChecked(checked === "checked" ? "unchecked" : "checked")
            }
            color="#2D68FF"
          />
          <Text>Eu concordo com a </Text>
          <TouchableOpacity onPress={() => setVisible(true)}>
            <Text style={{ color: "#2D68FF" }}>Política de Privacidade</Text>
          </TouchableOpacity>
        </View>

        <Portal style={styles.portal}>
          <Dialog visible={visible} style={styles.dialog}>
            <Dialog.ScrollArea>
              <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
                <Title style={{ fontSize: 18, fontFamily: "Inter_400Regular" }}>
                  MOOB - Mobilidade Mobile
                </Title>
                <Paragraph style={{ fontFamily: "Inter_400Regular" }}>
                  Bem-vindo ao MOOB! Priorizamos a privacidade dos nossos
                  usuários. Aqui estão alguns pontos importantes da nossa
                  Política de Privacidade:
                </Paragraph>

                <Paragraph style={{ fontFamily: "Inter_400Regular" }}>
                  <Text>
                    <Text style={{ fontWeight: "bold" }}>
                      Informações Coletadas:
                    </Text>{" "}
                    Coletamos apenas informações essenciais para melhorar a sua
                    experiência no aplicativo. Isso inclui dados fornecidos
                    durante o cadastro e informações sobre o uso do app.
                  </Text>
                </Paragraph>

                <Paragraph style={{ fontFamily: "Inter_400Regular" }}>
                  <Text>
                    <Text style={{ fontWeight: "bold" }}>
                      Uso das Informações:
                    </Text>{" "}
                    Utilizamos suas informações para personalizar o serviço,
                    enviar atualizações relevantes e melhorar nossos recursos.
                    Nunca compartilhamos suas informações sem o seu
                    consentimento, a menos que seja exigido por lei.
                  </Text>
                </Paragraph>

                <Paragraph style={{ fontFamily: "Inter_400Regular" }}>
                  <Text>
                    <Text style={{ fontWeight: "bold" }}>Segurança:</Text>{" "}
                    Implementamos medidas de segurança para proteger suas
                    informações, embora nenhum método seja totalmente infalível.
                  </Text>
                </Paragraph>

                <Paragraph style={{ fontFamily: "Inter_400Regular" }}>
                  <Text>
                    <Text style={{ fontWeight: "bold" }}>
                      Cookies e Tecnologias:
                    </Text>{" "}
                    Usamos cookies para aprimorar sua experiência. Você pode
                    controlar isso nas configurações do seu dispositivo.
                  </Text>
                </Paragraph>

                <Paragraph style={{ fontFamily: "Inter_400Regular" }}>
                  <Text>
                    <Text style={{ fontWeight: "bold" }}>
                      Alterações na Política:
                    </Text>{" "}
                    Ocasionalmente, podemos fazer ajustes nesta política.
                    Recomendamos que a revise periodicamente.
                  </Text>
                </Paragraph>

                <Paragraph style={{ fontFamily: "Inter_400Regular" }}>
                  <Text>
                    Ao usar o MOOB, você concorda com esta Política de
                    Privacidade. Se tiver dúvidas, entre em contato conosco pelo
                    suportemoob@gmail.com.
                  </Text>
                </Paragraph>

                <Paragraph style={{ fontFamily: "Inter_400Regular" }}>
                  <Text>
                    <Text style={{ fontWeight: "bold" }}>
                      Última Atualização:
                    </Text>{" "}
                    07/12/2023
                  </Text>
                </Paragraph>
              </ScrollView>

              <View
                style={{
                  fontFamily: "Inter_400Regular",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 24,
                }}
              >
                <Button
                  style={styles.button}
                  onPress={() => {
                    setVisible(false);
                    setChecked("unchecked");
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  style={styles.button}
                  onPress={() => {
                    setVisible(false);
                    setChecked("checked");
                  }}
                >
                  Aceito
                </Button>
              </View>
            </Dialog.ScrollArea>
          </Dialog>
        </Portal>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>Criar uma conta</Text>
        </TouchableOpacity>
      </Animatable.View>
    </SafeAreaView>
  );
}
