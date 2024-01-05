import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { List } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import styles from "./style";
import Logo from "../../../assets/MOOB.svg";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter";
import { useNavigation } from "@react-navigation/native";

const AboutScreen = () => {
  const navigation = useNavigation();
  const [frontEndExpanded, setFrontEndExpanded] = useState(false);
  const [backEndExpanded, setBackEndExpanded] = useState(false);
  const [DocsExpanded, setDocsExpanded] = useState(false);

  const frontEndTeam = [
    {
      name: "Maria Eduarda Brandão",
      image: require("../../../assets/team/duda.jpeg"),
    },
    { 
      name: "Ryan Peterson", 
      image: require("../../../assets/team/Ryan.jpeg") },
    {
      name: "Alexsandro Ferreira",
      image: require("../../../assets/team/alex.jpeg"),
    },
  ];

  const backEndTeam = [
    { 
      name: "Ryan Peterson", 
      image: require("../../../assets/team/Ryan.jpeg") },
    {
      name: "Carlos Segundo",
      image: require("../../../assets/team/carlos.jpeg"),
    },
    {
      name: "Railan Santana",
      image: require("../../../assets/team/railan.jpeg"),
    },
    {
      name: "Josiel Amorim",
      image: require("../../../assets/team/josiel.jpeg"),
    },
  ];

  const DocsTeam = [
    // {
    //   name: "Alexsandro Ferreira",
    //   image: require("../../../assets/team/alex.jpeg"),
    // },
    {
      name: "Bianca Barroca",
      image: require("../../../assets/team/Bianca.jpeg"),
    },
    {
      name: "Josiel Amorim",
      image: require("../../../assets/team/josiel.jpeg"),
    },
  ];

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
        <Animatable.View animation="fadeInLeft">
          <TouchableOpacity
            style={styles.backButtonContainer}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={require("../../../assets/icons/icon-voltar.png")}
              resizeMode="contain"
              style={styles.backIcon}
            />

            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>
        </Animatable.View>

        <Logo style={styles.logo} width={110} height={110} />
        <Text style={styles.title}>Mobilidade Mobile</Text>

        <View style={styles.containerText}>
          <View style={styles.box}>
            <Image
              source={require("../../../assets/icons/gps.png")}
              style={{ alignSelf: "center", width: 45, height: 45 }}
            />
            <Text style={styles.descriptionTitle}>
              Inovação em Mobilidade Urbana
            </Text>
            <Text style={styles.description}>
              O MOOB é pioneiro em promover autonomia para pessoas com
              deficiências físicas, transformando a maneira como se deslocam
              diariamente.
            </Text>
          </View>

          <View style={styles.box}>
            <Image
              source={require("../../../assets/icons/icons8-gps-96.png")}
              style={{ alignSelf: "center", width: 45, height: 45 }}
            />
            <Text style={styles.descriptionTitle}>Rotas Personalizadas</Text>
            <Text style={styles.description}>
              Nosso aplicativo cria rotas adaptadas, evitando obstáculos urbanos
              e garantindo um trajeto seguro e eficiente até o seu destino.
            </Text>
          </View>

          <View style={styles.box}>
            <Image
              source={require("../../../assets/icons/approved.png")}
              style={{ alignSelf: "center", width: 45, height: 45 }}
            />

            <Text style={styles.descriptionTitle}>Informações Acessíveis</Text>
            <Text style={styles.description}>
              Descubra estabelecimentos amigáveis à acessibilidade nas
              proximidades, escolhendo a melhor opção para suas necessidades.
            </Text>
          </View>
        </View>

        <View style={styles.boxList}>
          <Image
            source={require("../../../assets/icons/equipe.png")}
            style={{ alignSelf: "center", width: 45, height: 45 }}
          />
          <Text style={styles.descriptionTitle}>Colaboradores do projeto</Text>

          <List.Section style={styles.listSection}>
            <List.Accordion
              title="Equipe Front-end"
              style={styles.accordion}
              titleStyle={styles.accordionTitle}
              left={(props) => (
                <List.Icon {...props} icon="laptop" color="#FBA708" />
              )}
              expanded={frontEndExpanded}
              onPress={() => setFrontEndExpanded(!frontEndExpanded)}
            >
              {frontEndTeam.map((member, index) => (
                <List.Item
                  key={index}
                  title={member.name}
                  description="Front-end Developer"
                  left={() => (
                    <Image
                      source={member.image}
                      style={styles.smallTeamMemberImage}
                    />
                  )}
                  titleStyle={styles.teamMemberName}
                  descriptionStyle={styles.memberRole}
                  style={styles.listItem}
                />
              ))}
            </List.Accordion>

            <List.Accordion
              title="Equipe Back-end"
              style={styles.accordion}
              titleStyle={styles.accordionTitle}
              left={(props) => (
                <List.Icon {...props} icon="server" color="#FBA708" />
              )}
              expanded={backEndExpanded}
              onPress={() => setBackEndExpanded(!backEndExpanded)}
            >
              {backEndTeam.map((member, index) => (
                <List.Item
                  key={index}
                  title={member.name}
                  description="Back-end Developer"
                  left={() => (
                    <Image
                      source={member.image}
                      style={styles.smallTeamMemberImage}
                    />
                  )}
                  titleStyle={styles.teamMemberName}
                  descriptionStyle={styles.memberRole}
                  style={styles.listItem}
                />
              ))}
            </List.Accordion>

            <List.Accordion
              title="Documentações"
              style={styles.accordion}
              titleStyle={styles.accordionTitle}
              left={(props) => (
                <List.Icon {...props} icon="folder" color="#FBA708" />
              )}
              expanded={DocsExpanded}
              onPress={() => setDocsExpanded(!DocsExpanded)}
            >
              {DocsTeam.map((member, index) => (
                <List.Item
                  key={index}
                  title={member.name}
                  description="Documentação"
                  left={() => (
                    <Image
                      source={member.image}
                      style={styles.smallTeamMemberImage}
                    />
                  )}
                  titleStyle={styles.teamMemberName}
                  descriptionStyle={styles.memberRole}
                  style={styles.listItem}
                />
              ))}
            </List.Accordion>
          </List.Section>
        </View>
        <Text style={styles.version}>Versão 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutScreen;
