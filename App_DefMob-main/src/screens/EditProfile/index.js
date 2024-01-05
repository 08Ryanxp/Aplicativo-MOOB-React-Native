import { MaskedTextInput } from "react-native-mask-text";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import styles from "./style";
import RNPickerSelect from "react-native-picker-select";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  StatusBar
} from "react-native";
import ProfileDb from "../Profile/back";
import EditProfileDb from "./back";
import React, { useState, useEffect } from "react";
import * as ImagePiker from "expo-image-picker";

export default function EditProfile() {
  const navigation = useNavigation();
  const [modalVisible, setmodalVisible] = useState(false);
  const [image, setImage] = useState();
  const [profiles, setProfiles] = useState([]);
  const [imageAux, setImageAux] = useState();
  const [profileEdit, setProfileEdit] = useState({
    foto_perfil: "",
    nome_completo: "",
    email: "",
    telefone: "",
    telefone: "",
    genero: "",
    cpf: "",
    deficiencia: "",
  });
  const profileDb = new ProfileDb();
  const editProfileDb = new EditProfileDb();
  const isFocused = useIsFocused();
  const [apagado, setApagado] = useState(false);
  const profileData = {
    //if e else para caso o profile esteja vazio
    foto_perfil: profiles.length > 0 ? profiles[0].foto_perfil : "",
    nome_completo: profiles.length > 0 ? profiles[0].nome_completo : "",
    email: profiles.length > 0 ? profiles[0].email : "",
    telefone: profiles.length > 0 ? profiles[0].telefone : "",
    genero: profiles.length > 0 ? profiles[0].genero : "",
    cpf: profiles.length > 0 ? profiles[0].cpf : "",
    deficiencia: profiles.length > 0 ? profiles[0].deficiencia : "",
  };

  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 5,
      borderWidth: 0,
      borderColor: "gray",
      fontFamily: "Inter_400Regular",
      color: "black",
    },
    inputAndroid: {
      fontSize: 16,
      paddingVertical: 5,
      borderWidth: 0,
      borderColor: "gray",
      fontFamily: "Inter_400Regular",
      color: "black",
    },
    placeholder: {
      color: "#00000060",
    },
  });

  //9 - accept digit.
  //A - accept alpha.
  //S - accept alphanumeric.

  const UpModal = ({ visible, children }) => {
    const [showModal, setShowModal] = useState(visible);
    useEffect(() => {
      toggleModal();
    }, [visible]);
    const toggleModal = () => {
      if (visible) {
        setShowModal(true);
      } else {
        setShowModal(false);
      }
    };
    return (
      <Modal
        animationType="slide"
        transparent
        visible={showModal}
        onRequestClose={() => {
          setmodalVisible(!modalVisible);
          console.log("teste");
        }}
      >
        <View style={styles.modalBackground}>
          <View style={[styles.modalContainer]}>{children}</View>
        </View>
      </Modal>
    );
  };

  const hendleImage = async (mode) => {
    try {
      let result = {};

      if (mode === "galeria") {
        await ImagePiker.requestMediaLibraryPermissionsAsync();
        result = await ImagePiker.launchImageLibraryAsync({
          mediaTypes: ImagePiker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      } else {
        await ImagePiker.requestCameraPermissionsAsync();
        result = await ImagePiker.launchCameraAsync({
          cameraType: ImagePiker.CameraType.front,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      }

      if (!result.canceled) {
        // salvando Imagem
        console.log("salvando imagem");
        await saveIamge(result.assets[0].uri);
        // setImage(result.assets[0].uri);
      }
    } catch (error) {
      alert("Erro ao atualizar a imagem: " + error.message);
      setmodalVisible(false);
    }
  };

  const removerImage = () => {
    try {
      setImage("");
      console.log("Como fica o set", image);
      // setProfileEdit({ ...profileEdit, foto_perfil: "" });
      console.log("profile edit", profileEdit);
      setmodalVisible(false);
      console.log("Removida");
      setImageAux("");
      setApagado(true);
    } catch (error) {
      console.error("Erro ao remover imagem:", error.message);
      setmodalVisible(false);
    }
  };

  const saveIamge = async (imagem) => {
    try {
      // Atualizando imagem exibida
      console.log("link da imagem", imagem);
      setImage(imagem);
      console.log("Set da imagem ", image);

      // Add imagem no bd
      // setProfileEdit({ ...profileEdit, foto_perfil: imagem });
      console.log("imagem+>", profileEdit.foto_perfil);
      setImageAux(imagem);
      setmodalVisible(false);
    } catch (error) {
      throw error;
    }
  };
  //função para tratar os campos vazios
  const handleChangeText = async () => {
    // nome: condição ? verdadeiro : false (me basear)
    const profileUpdate = {
      foto_perfil: imageAux,
      nome_completo:
        profileEdit.nome_completo.length > 0
          ? profileEdit.nome_completo
          : profiles[0].nome_completo,
      email:
        profileEdit.email.length > 0 ? profileEdit.email : profiles[0].email,
      telefone:
        profileEdit.telefone.length > 0
          ? profileEdit.telefone
          : profiles[0].telefone,
      genero:
        profileEdit.genero.length > 0 ? profileEdit.genero : profiles[0].genero,
      cpf: profileEdit.cpf.length > 0 ? profileEdit.cpf : profiles[0].cpf,
      deficiencia:
        profileEdit.deficiencia.length > 0
          ? profileEdit.deficiencia
          : profiles[0].deficiencia,
    };

    //chama o metodo UpdateProfile para mandar os valores e editar no banco
    const validacao = await editProfileDb.UpdateProfile(profileUpdate);
    if (validacao) {
      console.log("Foi");
      navigation.goBack();
    } else {
      console.log("Calma moreno");
    }
  };

  //recupera do banco e adiciona os valores no array profiles
  useEffect(() => {
    profileDb.getProfile().then((profile) => {
      setProfiles(profile);
    });
  }, []);

  useEffect(() => {
    if (isFocused) {
      if (image) {
        setImageAux(image);
      } else if (apagado) {
        setImageAux("");
      } else if (profileData.foto_perfil) {
        setImageAux(profileData.foto_perfil);
      } else {
        setImageAux("");
      }
    }
  }, [isFocused, profileData, image, apagado]);

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
      <ScrollView style={{ flex: 1 }}>
        <ImageBackground source={require("../../../assets/profile2.png")}>
          <View style={styles.containerProfile}>
            <View style={styles.rowProfile}>
              <TouchableOpacity
                style={styles.buttonBack}
                onPress={() => navigation.navigate("Perfil")}
              >
                <Image
                  source={require("../../../assets/icons/icon-voltar-wh.png")}
                  style={styles.iconBack}
                />
                <Text style={styles.textIcon}>Voltar</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.containerPhoto}>
              <View style={styles.photoProfile}>
                <Image
                  source={
                    imageAux != ""
                      ? { uri: imageAux }
                      : require("../../../assets/images/avatar-profile.png")
                  }
                  style={styles.image}
                />
              </View>

              <View style={styles.addPhoto}>
                <TouchableOpacity onPress={() => setmodalVisible(true)}>
                  <Image
                    source={require("../../../assets/icons/icon-adicionar.png")}
                    style={styles.iconAdd}
                  />
                </TouchableOpacity>

                <UpModal visible={modalVisible}>
                  <Text style={styles.textModal}>Atualizar foto do perfil</Text>
                  <View style={styles.orContainer}>
                    <View style={styles.line}></View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <TouchableOpacity onPress={() => hendleImage()}>
                      <View style={{alignItems: 'center',
                          justifyContent: "center"}}>
                        <Image
                          source={require("../../../assets/icons/iconcamera.png")}
                          style={{
                            height: 50,
                            width: 50,
                          }}
                        />
                        <Text style={{
                          
                          textAlign: 'center'
                        }}>Câmera</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => hendleImage("galeria")}>
                      <View style={{
                        alignItems: 'center',
                        justifyContent: "center"
                      }}>
                        <Image
                          source={require("../../../assets/icons/icongallery.png")}
                          style={{
                            height: 50,
                            width: 50,
                          }}
                        />
                        <Text style={{

                          textAlign: 'center'
                        }}>Galeria</Text>
                      </View>
                    </TouchableOpacity>
                    <View>
                      <TouchableOpacity onPress={() => removerImage()}>
                        <View style={{alignItems: 'center',
                          justifyContent: "center"}}>
                          <Image
                            source={require("../../../assets/icons/iconbin.png")}
                            style={{
                              height: 50,
                              width: 50,
                            }}
                          />
                          <Text style={{
                            
                            textAlign: 'center'
                          }}>Remover</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => setmodalVisible(false)}>
                    <View
                      style={{
                        marginTop: "10%",
                        alignItems: "flex-end",
                      }}
                    >
                      {console.log("Clicou")}
                      <Text
                        style={styles.close}
                      >
                        Cancelar
                      </Text>
                    </View>
                  </TouchableOpacity>
                </UpModal>
              </View>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.containerData}>

          <Text style={styles.title}>Informações básicas</Text>
          <Text style={styles.label}>Nome completo</Text>
          <TextInput
            placeholderTextColor="#00000060"
            placeholder="Nome completo"
            style={styles.input}
            onChangeText={(text) =>
              setProfileEdit({ ...profileEdit, nome_completo: text })
            }
            defaultValue={profileData.nome_completo}
          ></TextInput>

          <View style={styles.orContainer}>
            <View style={styles.line}></View>
          </View>

          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Email"
            style={styles.input}
            editable={false}
            defaultValue={profileData.email}
            keyboardType="email-address"
          />

          <View style={styles.orContainer}>
            <View style={styles.line}></View>
          </View>

          <Text style={styles.label}>PCD</Text>
          <TextInput
            style={styles.input}
            editable={false}
            placeholder="Selecione"
            onChangeText={(text) =>
              setProfileEdit({ ...profileEdit, deficiencia: text })
            }
            defaultValue={profileData.deficiencia}
          ></TextInput>


          <View style={styles.orContainer}>
            <View style={styles.line}></View>
          </View>

          <Text style={styles.titleAdd}>Informações adicionais</Text>


          <Text style={styles.label}>Gênero</Text>
          <RNPickerSelect
            selectedValue={profileEdit.genero || profileData.genero || ""}
            onValueChange={(itemValue, itemIndex) =>
              setProfileEdit({ ...profileEdit, genero: itemValue })
            }
            items={[
              { label: "Mulher cisgênero", value: "Mulher cisgênero" },
              { label: "Homem cisgênero", value: "Homem cisgênero" },
              { label: "Mulher transgênero", value: "Mulher transgênero" },
              { label: "Homem transgênero", value: "Homem transgênero" },
              { label: "Outro", value: "Outro" },

            ]}
            placeholder={{ label: "Selecione seu gênero", value: null }}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
          />

          <View style={styles.orContainer}>
            <View style={styles.line}></View>
          </View>

          <Text style={styles.label}>CPF</Text>
          <MaskedTextInput
            style={styles.input}
            mask="999.999.999-99"
            placeholder="000.000.000-00"
            keyboardType="numeric"
            value={profileData.cpf}
            onChangeText={(text) =>
              setProfileEdit({ ...profileEdit, cpf: text })
            }
          />

          <View style={styles.orContainer}>
            <View style={styles.line}></View>
          </View>


          <Text style={styles.label}>Número de telefone</Text>
          <MaskedTextInput
            placeholder="(00) 00000-0000"
            keyboardType="numeric"
            mask="(99) 99999-9999"
            style={styles.input}
            value={profileData.telefone}
            onChangeText={(text) =>
              setProfileEdit({ ...profileEdit, telefone: text })
            }
          />

          <View style={styles.orContainer}>
            <View style={styles.line}></View>
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => handleChangeText()}
          >
            <Text style={styles.textSaveButton}>Salvar alterações</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
