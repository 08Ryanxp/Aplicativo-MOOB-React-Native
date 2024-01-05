import MapDb from "../Map/back";
import RNPickerSelect from "react-native-picker-select";
import React, { useState, useEffect, useRef } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Toast from "react-native-toast-message";
import config from "../../config";
import styles from "./style";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {
  IconButton,
  Menu,
  Modal,
  Portal,
  Card,
  TouchableRipple,
  ActivityIndicator,
  FAB,
} from "react-native-paper";
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
  Image,
  Text,
  SafeAreaView,
  Keyboard,
  FlatList,
  TextInput,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { EditRoutes } from "../EditRoutes/EditRoutes";
const PredefinedPlaces = () => {
  const autocompleteRef = useRef(null);
  const mapDb = new MapDb();
  const [favoriteRoute, setFavoriteRoute] = useState(null);
  const [nameLocation, setNameLocation] = useState(null);
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(null);
  const [idRoute, setIdRoute] = useState(null);
  const [menuEditRoutesId, setMenuEditRoutesId] = useState(null);
  const [placeholderTitle, setPlaceholderTitle] = useState("Endereço do local");
  const [dbRouteSave, setDbRouteSave] = useState([]);
  const [typePredefined, setTypePredefined] = useState(null);
  const [transferRoutes, setTransferRoutes] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const Width = Dimensions.get("window").width;
  const Height = Dimensions.get("window").height;
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const route = useRoute();

  const openMenu = (itemId) => {
    setMenuEditRoutesId(itemId);
  };

  const closeModalEdit = () => {
    setModalVisible(false);
  };
  const openModalEdit = () => {
    setModalVisible(true);
  };

  //style do dropdown
  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      width: "100%",
      fontFamily: "Inter_400Regular",
      backgroundColor: "#fff",
      borderRadius: 50,
      marginBottom: "2%",
      paddingVertical: 8,
      paddingHorizontal: 10,
      fontSize: 16,
      borderWidth: 1,
      borderColor: "#999"
    },
    inputAndroid: {
      width: "100%",
      fontFamily: "Inter_400Regular",
      backgroundColor: "#fff",
      borderRadius: 50,
      marginBottom: "2%",
      paddingVertical: 8,
      paddingHorizontal: 10,
      fontSize: 16,
      borderWidth: 1,
      borderColor: "#999"
    },
    placeholder: {
      color: "#00000060",
    },
  });

  //icone que vai ficar na rota salva
  const getIconForType = (type) => {
    switch (type) {
      case "casa":
        return require("../../../assets/typeFavorite/casa.png");
      case "trabalho":
        return require("../../../assets/typeFavorite/trabalho.png");
      case "escola":
        return require("../../../assets/typeFavorite/universidade.png");
      case "hospital":
        return require("../../../assets/typeFavorite/hospital.png");
      case "restaurante":
        return require("../../../assets/typeFavorite/restaurante.png");
      case "loja":
        return require("../../../assets/typeFavorite/loja.png");
      case "universidade":
        return require("../../../assets/typeFavorite/universidade.png");
      case "aeroporto":
        return require("../../../assets/typeFavorite/aeroporto.png");
      case "banco":
        return require("../../../assets/typeFavorite/banco.png");
      case "shopping":
        return require("../../../assets/typeFavorite/shopping.png");
      case "centro":
        return require("../../../assets/typeFavorite/centro.png");
      case "mercado":
        return require("../../../assets/typeFavorite/mercado.png");
      case "lazer":
        return require("../../../assets/typeFavorite/lazer.png");
      default:
        return require("../../../assets/typeFavorite/outros.png");
    }
  };

  const routesDestTransfer = (routeTranfer, nameDest, navigation) => {
    try {
      console.log("async :", routeTranfer);
      // Verificar se há dados em routeTranfer
      if (routeTranfer && routeTranfer.latitude && routeTranfer.longitude) {
        // Navegar para outro arquivo usando o navigation
        navigation.navigate("Mapa", { routeTranfer, nameDest });
      } else {
        console.warn("Dados de rota inválidos.");
      }

      return routeTranfer;
    } catch (err) {
      console.log("LÁGRIMAS EM tranfer => ", err);
      throw err;
    }
  };

  // const transferForEdit = (id, navigation) => {
  //   try {
  //     console.log("ID ROUTES", id);
  //     if (id) {
  //       navigation.navigate("EditRoutes", { id });
  //     } else {
  //       console.log("CAIU NO CONTO DO IF");
  //     }
  //     return id;
  //   } catch (err) {
  //     console.log("EDIT FOR TRANFER", err);
  //     throw err;
  //   }
  // };

  const closeMenu = () => {
    setMenuEditRoutesId(null);
  };

  const getReverseGeocodingData = async (lat, lng) => {
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyC6qEhBPYtn-HL9jIC_QkFFZpV4x8JFGMY`;

    try {
      const response = await fetch(apiUrl);
      const responseJson = await response.json();

      if (responseJson.results.length > 0) {
        return responseJson.results[0].formatted_address;
      } else {
        return "Endereço não encontrado";
      }
    } catch (error) {
      console.error("Erro na geocodificação reversa:", error);
      return "Erro ao obter endereço";
    }
  };

  const fetchData = async () => {
    try {
      const predefinedRoutes = await mapDb.getRoute();
      const routesWithAddress = await Promise.all(
        predefinedRoutes.map(async (route) => {
          const address = await getReverseGeocodingData(
            route.geometry.location.lat,
            route.geometry.location.lng
          );
          return { ...route, address };
        })
      );

      setDbRouteSave(routesWithAddress);
      setDataLoaded(true);
    } catch (error) {
      console.log("predefined error => ", error);
    }
  };

  useEffect(() => {
    // Esta função será chamada quando 'isFocused' mudar ou quando 'route.params?.updated' mudar.
    if (isFocused || route.params?.updated || closeModalEdit()) {
      fetchData();
    }
  }, [isFocused, route.params?.updated]);

  const handleClearText = () => {
    if (autocompleteRef.current) {
      autocompleteRef.current.setAddressText("");
    }
  };
  const doubleActionFromEdit = (id) => {
    console.log("id em double", id);
    openModalEdit();
    setIdRoute(id);
  };
  const modalEditRoutes = () => {
    // setModalVisible(true)
    return (
      <Portal>
        <Modal
          contentContainerStyle={styles.AddContainer}
          visible={modalVisible}
          onDismiss={() => closeModalEdit()}
        >
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={styles.titleModalAdd}>Editar rotas</Text>
            <View style={{ marginBottom: "4%" }}>
              <IconButton icon="close" size={24} onPress={closeModalEdit}/>
            </View>
          </View>
          {idRoute !== undefined && ( // Verifica se idRoute está definido antes de renderizar EditRoutes
            <EditRoutes route={{ params: { id: idRoute } }} />
          )}
          {/* <Text>chegando...</Text> */}
        </Modal>
      </Portal>
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderDataNewRoute = () => {
    return (
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.AddContainer}
          animationType="slide"
        >
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={styles.titleModalAdd}>Adicionar novas rotas</Text>
            <View style={{ marginBottom: "4%" }}>
              <IconButton icon="close" size={24} onPress={hideModal} />
            </View>
          </View>
          <GooglePlacesAutocomplete
            styles={{
              textInput: {
                borderRadius: 50,
                paddingVertical: 6,
                paddingHorizontal: 10,
                fontSize: 16,
                marginBottom: "5%",
                flex: 1,
                borderWidth: 1,
                borderColor: "#999",
              },
            }}
            ref={autocompleteRef}
            placeholder={placeholderTitle}
            enableHighAccuracyLocation={true}
            enablePoweredByContainer={false}
            onPress={(data, details = null) => {
              const favoriteRouter = {
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              };
              setFavoriteRoute((prevState) => ({
                ...prevState,
                ...favoriteRouter,
              }));
            }}
            fetchDetails={true}
            query={{
              key: config.API_KEY,
              language: "pt-BR",
              components: "country:BR",
            }}
          />
          <TextInput
            value={nameLocation}
            onChangeText={(text) => setNameLocation(text)}
            label={"Nome do local"}
            autoCorrect={true}
            placeholder="Nome do local"
            style={styles.input}
          />

          <RNPickerSelect
            onValueChange={(item) => {
              setTypePredefined(item);
            }}
            items={[
              { label: "Casa", value: "casa" },
              { label: "Trabalho", value: "trabalho" },
              { label: "Escola  ", value: "escola " },
              { label: "Hospital", value: "hospital" },
              { label: "Restaurante", value: "restaurante" },
              { label: "Loja", value: "loja" },
              { label: "Universidade", value: "universidade" },
              { label: "Aeroporto", value: "aeroporto" },
              { label: "Banco", value: "banco" },
              { label: "Parque", value: "parque" },
              {
                label: "Shopping Center",
                value: "shopping",
              },
              { label: "Centro Comercial", value: "centro" },
              { label: "Mercado", value: "mercado" },
              {
                label: "Lazer",
                value: "lazer",
              },
            ]}
            placeholder={{
              label: "Selecione o tipo de local",
              value: null,
            }}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
          />
          <TouchableOpacity
            mode="contained"
            onPress={actionHandlePressRoute}
            style={styles.buttonStyle}
          >
            <Text style={{ fontFamily: "Inter_700Bold", fontSize: 16, color: "#fff" }}>
              Favoritar rota
            </Text>
          </TouchableOpacity>
        </Modal>
      </Portal>
    );
  };

  const actionHandlePressRoute = async () => {
    if (
      favoriteRoute &&
      nameLocation != null &&
      nameLocation !== "" &&
      typePredefined !== null
    ) {
      const newPredefined = {
        id: Math.random()
          .toFixed(7)
          .toString()
          .concat(nameLocation + favoriteRoute.latitude),
        type: { typePredefined },
        description: { nameLocation },
        geometry: {
          location: {
            lat: favoriteRoute.latitude,
            lng: favoriteRoute.longitude,
          },
        },
      };
      console.log("id", newPredefined.id);
      try {
        const routeId = await mapDb.addRoute(newPredefined);
        console.log("EU OUVI AMÉM?:", routeId);
        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Local salvo com sucesso",
          text2: nameLocation,
          visibilityTime: 3000,
        });
        setDataLoaded(true);
        setNameLocation("");
        handleClearText();
        Keyboard.dismiss();
        await fetchData();
        hideModal();
      } catch (error) {
        console.error(
          "MARIA PASSA NA FRENTE, PISA NA CABEÇA DA SERPENTE:",
          error
        );
      }
    } else {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Indique o nome, local e o tipo do destino",
        text2: "Ex: Minha casa",
        visibilityTime: 3000,
      });
      Keyboard.dismiss();
    }
  };

  const handleRemovePress = async (id) => {
    try {
      await mapDb.removeRouteDB(id);
      fetchData();
      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Rota removida com sucesso!",
        visibilityTime: 3000,
      });
    } catch (error) {
      console.error("ERRO AO DELETAR ROTA DO BANCO DE DADOS:", error);
    }
  };
  //atualize os dados no método useEffect
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchData(); // Atualiza os dados quando a tela for focada novamente
    });
    return unsubscribe;
  }, [navigation]);


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

  const renderItem = ({ item, index, separators }) => {
    if (!item || !item.description) {
      return null;
    }

    const iconColor = index % 2 === 0 ? "#2D68FF" : "#FBA708";

    return (
      <Card style={styles.card}>
        <TouchableRipple
          style={styles.ripple}
          onPress={() => {
            const cordinateFavorite = {
              latitude: item.geometry.location.lat,
              longitude: item.geometry.location.lng,
            };
            const name = item.description.nameLocation;
            setTransferRoutes(cordinateFavorite);
            routesDestTransfer(cordinateFavorite, name, navigation);
            console.log("typ pred", item.type.typePredefined);
          }}
          underlayColor={"transparent"}
          onShowUnderlay={separators.highlight}
          onHideUnderlay={separators.unhighlight}
        >
          <Card.Content
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
            >
              <Image
                source={getIconForType(item.type.typePredefined)}
                style={{ width: 40, height: 40, tintColor: iconColor }}
              />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.title}>
                  {item.description.nameLocation}
                </Text>
                <Text style={styles.subtitle}>{item.address}</Text>
              </View>
            </View>

            <View style={{ marginLeft: 10 }}>
              <Menu
                contentStyle={{ backgroundColor: "#2D68FF", borderRadius: 20 }}
                visible={menuEditRoutesId === item.id}
                onDismiss={() => closeMenu()}
                anchor={
                  <IconButton
                    icon="dots-vertical"
                    size={25}
                    onPress={() => openMenu(item.id)}
                  />
                }
              >
                <Menu.Item
                  onPress={() => doubleActionFromEdit(item.id)}
                  title="Editar"
                  titleStyle={{ fontFamily: "Inter_400Regular", fontSize: 16, color: "#fff" }}
                />
                <Menu.Item
                  onPress={() => handleRemovePress(item.id)}
                  title="Excluir"
                  titleStyle={{ fontFamily: "Inter_400Regular", fontSize: 16, color: "#fff" }}
                />
              </Menu>
            </View>
          </Card.Content>
        </TouchableRipple>
      </Card>
    );
  };

  const NoRoutesSaved = () => {
    return (
      <View style={styles.noRoutesContainer}>
        <Icon name="map-marker-outline" size={90} color="#808080" />
        <Text style={styles.noRoutesText}>Nenhum destino salvo</Text>
        <Text style={styles.noRoutesSubText}>
          Toque no '+' para adicionar suas rotas favoritas.
        </Text>
      </View>
    );
  };
  const Header = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Explore suas rotas</Text>
        <Text style={styles.headerSubTitle}>
          Crie e acesse facilmente seus destinos favoritos. Descubra novos
          caminhos com um toque!
        </Text>
      </View>
    );
  };

  const Footer = () => {
    return <FAB style={styles.fab} icon="plus" color="#fff" onPress={showModal} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <ImageBackground
        source={require("../../../assets/profile4.png")}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <Header />
      </ImageBackground>
      {visible && renderDataNewRoute()}
      {modalVisible && modalEditRoutes()}
      <View style={{ flex: 1 }}>
        {dataLoaded ? (
          dbRouteSave && dbRouteSave.length > 0 ? (
            <FlatList
              data={dbRouteSave}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              style={{ marginTop: 10 }}
            />
          ) : (
            <NoRoutesSaved />
          )
        ) : (
          <ActivityIndicator animating={true} color="#0074CC" />
        )}
      </View>
      <Footer />

    </SafeAreaView>
  );
};
export default PredefinedPlaces;
