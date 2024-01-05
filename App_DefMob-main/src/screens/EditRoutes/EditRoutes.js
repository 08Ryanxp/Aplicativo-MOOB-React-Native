import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { style } from "./styles";
import config from "../../config";
import MapDb from "./back";
import Toast from "react-native-toast-message";
import MapDbFromRoutes from "../Map/back";

export const EditRoutes = ({ route }) => {
  const mapDb = new MapDb();
  const mapDbFromRoutes = new MapDbFromRoutes();
  const id = route.params.id;
  const autocompleteRef = useRef();
  const [typeP, setType] = useState(null);
  const [editCoordinate, setEditCoordinate] = useState(null);
  const [dbRouteSave, setDbRouteSave] = useState([]);
  const [editNameLocation, setEditNameLocation] = useState(null);
  const navigation = useNavigation();

  const toast = (txt1, txt2, type) => {
    Toast.show({
      text1: txt1,
      text2: txt2,
      visibilityTime: 3000,
      topOffset: 50,
      type: type,
      animation: "slide",
      position: "bottom",
    });
  };
  const atts = {
    type: typeP ? typeP : null,
    description: editNameLocation ? { nameLocation: editNameLocation } : null,
    geometry: editCoordinate
      ? {
          location: {
            lat: editCoordinate.latitude || null,
            lng: editCoordinate.longitude || null,
          },
        }
      : null,
  };

  const fetchData = async () => {
    try {
      const predefined = await mapDbFromRoutes.getRoute();
      setDbRouteSave(predefined);
      //   setDataLoaded(true);
    } catch (error) {
      console.log("predefined error => ", error);
    }
  };

  // console.log("em edit routes filho p",route)
  // console.log("em edit routes filho",route.params.id)
  return (
    <View>
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
            borderColor: "#999"
          },
        }}
        ref={autocompleteRef}
        placeholder="Qual o seu destino?"
        onPress={(data, details = null) => {
          const destinationLocation = {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
          };
          const nameDestino = details.formatted_address;
          // console.log(details)
          setEditCoordinate(destinationLocation);
        }}
        // predefinedPlaces={predefinedPlacesCurrent}
        enablePoweredByContainer={false}
        fetchDetails={true}
        query={{
          key: config.API_KEY,
          language: "pt-BR",
          components: "country:BR",
        }}
      />
      <TextInput
        style={style.input}
        value={editNameLocation}
        onChangeText={(text) => setEditNameLocation(text)}
        label={"Nome do local"}
        placeholder="Nome do local"
        autoCorrect={true}
      />
      <TouchableOpacity
        style={style.buttonStyle}
        mode="contained"
        onPress={() => {
          if (!editNameLocation && editCoordinate == null) {
            toast(
              "Atualize no mínimo um dos campos",
              "Dados ínvalidos",
              "error"
            );
          } else {
            console.log("atts", atts);
            console.log("id", id);
            toast("Mudança salva com sucesso", "Aguarde....", "success");
            mapDb.editRoute(atts, id);
            fetchData();
            navigation.navigate("Rotas Salvas", { updated: true });
          }
        }}
      >
        <Text style={{fontFamily: "Inter_700Bold", fontSize: 16, color: "#fff"}}>Salvar edição</Text>
      </TouchableOpacity>
    </View>
  );
};
