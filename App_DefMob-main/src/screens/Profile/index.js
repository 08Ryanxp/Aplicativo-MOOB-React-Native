import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/inter";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Switch,
  StatusBar
} from "react-native";
import { useAuth } from "../../context/auth";
import ProfileDb from "./back";
import onShare from "./share";
import styles from "./style";

export default function Profile() {
  const profileDB = new ProfileDb();
  const navigation = useNavigation();
  const [profiles, setProfiles] = useState([]);
  const nome_completo = profiles.length > 0 ? profiles[0].nome_completo : "";
  const foto_perfil = profiles.length > 0 ? profiles[0].foto_perfil : "";
  const email = profiles.length > 0 ? profiles[0].email : "";
  const isFocused = useIsFocused();
  const Width = Dimensions.get("screen").width;
  const Height = Dimensions.get("screen").height;

  useEffect(() => {
    const fetchData = async () => {
      if (isFocused) {
        try {
          const profile = await profileDB.getProfile();
          setProfiles(profile);
        } catch (error) {
          console.log("Deu merda profile: ", error);
        }
      }
    };
    fetchData();
  }, [isFocused]);

  const { Logout } = useAuth();

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
      <ImageBackground
        source={require("../../../assets/profile.png")}
        resizeMode="cover"
        style={{ width: Width, height: Height }}
      >
        <View style={styles.containerProfile}>
          <View style={styles.containerPhoto}>
            <View style={styles.photoProfile}>
              <Image
                source={
                  foto_perfil
                    ? { uri: foto_perfil }
                    : require("../../../assets/images/avatar-profile.png")
                }
                style={styles.imageProfile}
              />
            </View>
            <View style={styles.textProfile}>
              <Text style={styles.nameUser}>{nome_completo}</Text>
              <Text style={styles.email}>{email}</Text>
            </View>
          </View>
        </View>

        <View style={styles.containerConfig}>
          <TouchableOpacity
            onPress={() => navigation.navigate("EditProfile")}
            style={styles.buttonsConfig}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../../assets/icons/conta.png")}
                style={{ marginRight: "3.5%", width: 31, height: 31 }}
              />
              <Text style={styles.textButtons}>Minha Conta</Text>
            </View>
            <Image
              source={require("../../../assets/icons/icon-proximo.png")}
              style={styles.iconNext}
            />
          </TouchableOpacity>

          <View style={styles.lineContainer}>
            <View style={styles.line}></View>
          </View>

          <View style={styles.buttonSwitch}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../../assets/icons/noturno.png")}
                style={{ marginRight: "3.5%", width: 31, height: 31 }} />
              <Text style={styles.textButtons}>Tema Noturno</Text>
            </View>
            <Switch></Switch>
          </View>

          <View style={styles.lineContainer}>
            <View style={styles.line}></View>
          </View>

          <TouchableOpacity style={styles.buttonsConfig} onPress={onShare}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../../assets/icons/convite.png")}
                style={{ marginRight: "3.5%", width: 31, height: 31 }} />
              <Text style={styles.textButtons}>Convidar Amigos</Text>
            </View>
            <Image
              source={require("../../../assets/icons/icon-proximo.png")}
              style={styles.iconNext}
            />
          </TouchableOpacity>

          <View style={styles.lineContainer}>
            <View style={styles.line}></View>
          </View>

          <TouchableOpacity style={styles.buttonsConfig} onPress={() => navigation.navigate("Contact")}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../../assets/icons/suporte.png")}
                style={{ marginRight: "3.5%", width: 31, height: 31 }} />
              <Text style={styles.textButtons}>Suporte</Text>
            </View>
            <Image
              source={require("../../../assets/icons/icon-proximo.png")}
              style={styles.iconNext}
            />
          </TouchableOpacity>

          <View style={styles.lineContainer}>
            <View style={styles.line}></View>
          </View>

          <TouchableOpacity style={styles.buttonsConfig} onPress={() => navigation.navigate("About")}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../../assets/icons/sobre.png")}
                style={{ marginRight: "3.5%", width: 31, height: 31 }} />
              <Text style={styles.textButtons}>Sobre o MOOB</Text>
            </View>
            <Image
              source={require("../../../assets/icons/icon-proximo.png")}
              style={styles.iconNext}
            />
          </TouchableOpacity>

          <View style={styles.lineContainer}>
            <View style={styles.line}></View>
          </View>
        </View>

        <View style={styles.containerButton}>
          <TouchableOpacity style={styles.buttonSignOut} onPress={Logout}>
            <Text style={styles.textSignOut}>Desconectar da conta</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
