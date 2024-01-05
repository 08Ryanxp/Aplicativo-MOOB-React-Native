import React, {
  useReducer,
  useRef,
  useEffect,
  useState,
} from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  Modal,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import {
  LocationAccuracy,
  requestForegroundPermissionsAsync,
  watchPositionAsync,
  getCurrentPositionAsync,
} from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import MapDb from "./back";
import { useIsFocused } from "@react-navigation/native";
import config from "../../config";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { toast } from "./toast"
import * as Animatable from "react-native-animatable";
import * as Speech from "expo-speech";

const initialState = {
  origin: null,
  destination: null,
  duration: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_ORIGIN":
      return { ...state, origin: action.data };
    case "SET_DESTINATION":
      return { ...state, destination: action.data };
    case "SET_DURATION":
      return { ...state, duration: action.data };
    default:
      throw new Error("Ação desconhecida");
  }
};

const Map = ({ route }) => {
  const mapDB = new MapDb();
  const [isSpeecking, setIsSpeecking] = useState(true)
  const [destinationPredefined, setDestinationPredefined] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [locationM, setLocationM] = useState([]);
  const [newOriginCoords, setNewOriginCoords] = useState(null);
  const [isNewOrigin, setisNewOrigin] = useState(false);
  const [latAux, setLatAux] = useState(null);
  const [lngAux, setLngAux] = useState(null);
  const { width, height } = Dimensions.get("window");
  const [state, dispatch] = useReducer(reducer, initialState);
  const mapEl = useRef(null);
  const [location, setLocation] = useState(null);
  const [titleDestino, setTitleDestino] = useState(null);
  const [titleLocation, setTitleLocation] = useState("Novo ponto de partida?");
  const [markerAux, setMarkerAux] = useState(null);
  const autocompleteRef = useRef(null);
  const autocompleteDestinationRef = useRef(null);
  const isFocused = useIsFocused();
  const [selectMarker, setSelectMarker] = useState([])


  async function requestLocationPermission() {
    const currentPosition = await getCurrentPositionAsync();
    if (currentPosition) {
      const currentLocation = {
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
      };
      setLatAux(currentPosition.coords.latitude);
      setLngAux(currentPosition.coords.longitude);
      setMarkerAux(currentLocation);
      setLocation(currentPosition);
    }
  }
 
  // verifica se usuario quer viajar a partir das rotas salvas
  useEffect(() => {
    // console.log("q porra é essa", route.params)
    // Verifica se route.params e route.params.routeTranfer existem
    if (route.params && route.params.routeTranfer) {
      // const { latitude, longitude } = route.params.routeTranfer;
      console.log("route.params.routeTranfer", route.params.routeTranfer)
      const destination = {
        latitude: route.params.routeTranfer.latitude,
        longitude: route.params.routeTranfer.longitude
      }
      // Verifica se latitude e longitude não são undefined antes de usá-los
      if (destination.latitude !== undefined && destination.longitude !== undefined) {
        console.log("Latitude:", destination.latitude);
        console.log("Longitude:", destination.longitude);
        if (location) {
          setDestinationPredefined(destination);
        }
        setTitleDestino(route.params.nameDest);
        console.log("name dest", route.params.nameDest);
        //  dispatch({ type: 'SET_DESTINATION', data: destinationLocation });
      } else {
        console.log("Latitude ou Longitude são undefined.");
      }
    } else {
      // console.log("Dados de rota indefinidos ou ausentes.");
    }
  }, [route]);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    const startWatching = async () => {
      const { granted } = await requestForegroundPermissionsAsync();
      if (granted) {
        const position = await watchPositionAsync(
          {
            accuracy: LocationAccuracy.Highest,
            timeInterval: 5000,
            distanceInterval: 10,
          },
          (newLocation) => {
            setLocation(newLocation);
            mapEl.current?.animateCamera({
              pitch: 70,
              center: newLocation.coords,
            });
          }
        );
      }
    };

    startWatching();
  }, [handleRecenter]);



  useEffect(() => {
    if (location && location.coords) {
      const originLocation = {
        latitude: state.origin
          ? state.origin.latitude
          : location?.coords.latitude || 0,
        longitude: state.origin
          ? state.origin.longitude
          : location?.coords.longitude || 0,
      };

      dispatch({ type: "SET_ORIGIN", data: originLocation });
    }
  }, [location]);
  //GetMarkerPosition
  useEffect(() => {
    if (isFocused) {
      mapDB
        .getMarker()
        .then((markers) => {
          setLocationM(markers);
          // console.log("marker", markers);
          // console.log("LocationM", locationM.titulo)
        })
        .catch((error) => {
          console.log("Deu merda Marcadores => ", error);
        });
    }
  }, [isFocused]);




  const handleCancel = () => {
    console.log("locatonM estrutura", destinationPredefined)
    cancelSound()
    setisNewOrigin(false)
    clearAutocompleteText()
    dispatch({ type: "SET_DESTINATION", data: null });
    setDestinationPredefined(null);
    route.params.routeTranfer = null
    setDistance(0);
    setDuration(0);
    if (location && location.coords) {
      const originLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      }
      dispatch({ type: "SET_ORIGIN", data: originLocation });
      setTimeout(() => {
        if (originLocation) {
          handleRecenter()
        }
      }, 100);
    }
    console.log("dest estrutura 2", destinationPredefined)
  };
  const toas = () => {
    Toast.show({
      text1: "Cancele um destino para escolher outro!",
      position: "bottom",
      backgroundColor: "#28a745",
      type: "info",
      autoHide: true,
      color: "#fff",
      topOffset: 30,
      bottomOffset: 60,
    });
  };
  const clearAutocompleteText = () => {
    if (autocompleteDestinationRef.current) {
      setTimeout(() => {
        autocompleteDestinationRef.current.setAddressText("");
      }, 100); // Aguarda 100 milissegundos antes de limpar o texto
    }
    // if (state.destination) {
    //   if (autocompleteRef.current) {
    //     setTimeout(() => {
    //       autocompleteRef.current.setAddressText("");
    //     }, 100); // Aguarda 100 milissegundos antes de limpar o texto
    //   }
    // }
  };

  useEffect(() => {
    if (state.destination) {
      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Calculando rota",
        text2: `${titleDestino || ""} destino`,
        visibilityTime: 1000,
      });
    } else if (destinationPredefined) {
      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Calculando rota",
        text2: `${titleDestino || ""} destino`,
        visibilityTime: 1000,
      });
    }
  }, [state.destination, destinationPredefined, titleDestino]);


  useEffect(() => {
    if (destinationPredefined && state.destination) {
      toas();
      handleCancel();
      clearAutocompleteText();
      handleRecenter();
      dispatch({ type: "SET_DESTINATION", data: null });
      setDestinationPredefined(null)
    }
  }, [destinationPredefined, state.destination]);

  // função que verifica se o marker já existe naquela localização
  const verifyMarker = async (id) => {
    const idUserMar = await AsyncStorage.getItem("userID");
    const markerExists = locationM.some((m) => {
      if (id === m.titulo && Math.abs(markerAux.latitude - m.coordinate.latitude) <= 0.00010) {
        if (m.idUsuarioMarker === idUserMar || m.idUsuarioMarker2 === idUserMar || m.idUsuarioMarker3 === idUserMar) {
          // Mostrar toast de sucesso
          Toast.show({
            type: 'success',
            position: 'bottom',
            text1: 'Marcador já adicionado!',
            visibilityTime: 3000,
          });
          console.log("Caso ja tenha alguem adicionado")
          return true; // Marcador encontrado, interrompe o loop
        }
        console.log("aqui para atualizar");
        attMarker(m);
        return true; // Marcador encontrado, interrompe o loop
      }
      return false;
    });

    if (!markerExists) {
      console.log("Aqui para add")
      addMarker(id);
      console.log("False")
    }
  };

  const verifyMarkerToRemove = async () => {
    const idUserMar = await AsyncStorage.getItem("userID");
    locationM.some((m) => {
      if (Math.abs(markerAux.latitude - m.coordinate.latitude) <= 0.00010) {
        if (m.idUsuarioMarkerDel === idUserMar || m.idUsuarioMarkerDel2 === idUserMar || m.idUsuarioMarkerDel3 === idUserMar) {
          // Mostrar toast de sucesso
          Toast.show({
            type: 'success',
            position: 'bottom',
            text1: 'Marcador já selcionado para excluir!',
            visibilityTime: 3000,
          });
          console.log("Caso ja tenha alguem adicionado")
          return true; // Marcador encontrado, interrompe o loop
        }
        console.log("aqui para atualizar");
        attMarkerToRemove(m);
        return true; // Marcador encontrado, interrompe o loop
      }
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Usuario muito longe!',
        visibilityTime: 3000,
      });
    });}

  const forMarker = async (m) => {
    const userIdMarker = await AsyncStorage.getItem("userID");
    const array = [m.idUsuarioMarker, m.idUsuarioMarker2, m.idUsuarioMarker3];

    const indexEmpty = array.findIndex((x) => x === "");
    if (indexEmpty !== -1) {
      array[indexEmpty] = userIdMarker;
    }

    console.log("Array atualizado", array);
    return array;
  };



  const attMarker = async (m) => {
    console.log("m aqui", m);
    const userIdMarker = await AsyncStorage.getItem("userID");
    console.log("Id", userIdMarker);

    const initialCount = isNaN(m.count) ? 0 : m.count;
    console.log("Contar", m.count);
    const newCount = initialCount + 1;

    const array = await forMarker(m); // Aguardar o resultado da função assíncrona
    console.log("Array", array);

    const newMarker = {
      idMarker: m.idMarker,
      idUsuarioMarker: array[0],
      idUsuarioMarker2: array[1],
      idUsuarioMarker3: array[2],
      idUsuarioMarkerDel: m.idUsuarioMarkerDel,
      idUsuarioMarkerDel2: m.idUsuarioMarkerDel2,
      idUsuarioMarkerDel3: m.idUsuarioMarkerDel3,
      titulo: m.titulo,
      coordinate: m.coordinate,
      count: newCount,
      countDel: m.countDel,
    };

    console.log("Contando", newMarker.count);
    setLocationM((prevMarkers) => [...prevMarkers, newMarker]);
    console.log("N", newMarker.titulo);

    if (newMarker.titulo && newMarker.coordinate.latitude && newMarker.coordinate.longitude) {
      console.log("bover pra editar", newMarker);
      const validacao = await mapDB.UpdateMarker(newMarker);
      if (validacao) {
        console.log("Foi");
      } else {
        console.log("Calma moreno");
      }
    } else {
      console.log("nulo", newMarker);
    }
  };
  const handleMarker = (m) => {
    setSelectMarker(m)
    setModalVisible2(!modalVisible2);
  }

  const forMarkerToRemove = async (m) => {
    const userIdMarker = await AsyncStorage.getItem("userID");
    const array = [m.idUsuarioMarkerDel, m.idUsuarioMarkerDel2, m.idUsuarioMarkerDel3];

    const indexEmpty = array.findIndex((x) => x === "");
    if (indexEmpty !== -1) {
      array[indexEmpty] = userIdMarker;
    }

    console.log("Array atualizado", array);
    return array;
  };


  // remover marcador
  const attMarkerToRemove = async (m) => {
    // m = selectMarker;
    const userIdMarker = await AsyncStorage.getItem("userID");
    console.log("Id", userIdMarker);
    console.log("m aqui", m);
    const initialCount = isNaN(m.countDel) ? 0 : m.countDel;

    const newCount = initialCount - 1;


    const array = await forMarkerToRemove(m); // Aguardar o resultado da função assíncrona
    console.log("Array", array);

    const newMarker = {
      idMarker: m.idMarker,
      idUsuarioMarkerDel: array[0],
      idUsuarioMarkerDel2: array[1],
      idUsuarioMarkerDel3: array[2],
      idUsuarioMarker: m.idUsuarioMarker,
      idUsuarioMarker2: m.idUsuarioMarker2,
      idUsuarioMarker3: m.idUsuarioMarker3,
      titulo: m.titulo,
      coordinate: m.coordinate,
      count: m.count,
      countDel: newCount,
    };

    console.log("Contando", newMarker.count);
    setLocationM((prevMarkers) => [...prevMarkers, newMarker]);
    console.log("N", newMarker.titulo);

    if (newMarker.titulo && newMarker.coordinate.latitude && newMarker.coordinate.longitude) {
      console.log("bover pra editar", newMarker);
      const validacao = await mapDB.UpdateMarker(newMarker);
      if (validacao) {
        setModalVisible2(!modalVisible2);
        if (newMarker.countDel <= 0) {
          console.log("Pronto para excluir", newMarker);
          const removeValidation = await mapDB.RemoveMarker(newMarker);
          if (removeValidation) {
            console.log("Marcador excluído");
            setModalVisible2(!modalVisible2);
          } else {
            console.log("Erro ao excluir marcador");
          }
        }
        else {
          Toast.show({
            type: 'success',
            position: 'bottom',
            text1: 'Marcador em andamento para excluir!',
            visibilityTime: 3000,
          });
          console.log("Att")
        }
      } else {
        console.log("Calma moreno");
      }
    } else {
      console.log("nulo", newMarker);
    }
  };

  // const removeMarker = async () => {
  //   const m = selectMarker;
  //       // Após atualizar os valores, verifique novamente antes de remover
  //       attMarkerToRemove(m);
  //       if (m.countDel <= 0) {
  //         console.log("Pronto para excluir", m);
  //         const removeValidation = await mapDB.RemoveMarker(m);
  //         if (removeValidation) {
  //           console.log("Marcador excluído");
  //           setModalVisible2(!modalVisible2);
  //         } else {
  //           console.log("Erro ao excluir marcador");
  //         }
  //       } else {
  //        console.log("Ainda não pode excluir, countDel != 0");
  //       }
  //     };



  // função para adicionar 
  const addMarker = async (id) => {
    const userIdMarker = await AsyncStorage.getItem("userID");
    const initialCount = isNaN(locationM.count) ? 0 : locationM.count;

    const newCount = initialCount + 1;

    const newMarker = {
      idMarker: Math.random().toString(),
      idUsuarioMarker: userIdMarker,
      idUsuarioMarker2: "",
      idUsuarioMarker3: "",
      idUsuarioMarkerDel: "",
      idUsuarioMarkerDel2: "",
      idUsuarioMarkerDel3: "",
      titulo: id,
      coordinate: markerAux,
      count: newCount,
      countDel: 3,

    };

    setLocationM((prevMarkers) => [...prevMarkers, newMarker]);

    if (id && markerAux.latitude && markerAux.longitude) {
      console.log("bover pra add", newMarker);
      // mapDB.addMarker(newMarker);
      const validacao = await mapDB.addMarker(newMarker);
      if (validacao) {
        setModalVisible(!modalVisible);
        console.log("Foi marker", newMarker);
      } else {
        console.log("Calma");
      }
    } else {
      console.log("nulo");
    }
  };

  const handleRecenter = async () => {
    // console.log("location => ", location.coords)
    if (isNewOrigin) {
      if (mapEl.current) {
        await mapEl.current.animateToRegion({
          latitude: newOriginCoords.latitude,
          longitude: newOriginCoords.longitude,
          latitudeDelta: 0.013,
          longitudeDelta: 0.011,
        });
      }
    } else if (location && location.coords && mapEl.current) {
      await mapEl.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.013,
        longitudeDelta: 0.011,
      });
    }
  };
  const waypointsToAvoid = locationM.map(marker => ({
    latitude: marker.coordinate.latitude,
    longitude: marker.coordinate.longitude,
  }));
  const STOP = false;
  const CONTINUE = true;

  let isStopping = false;

  const cancelSound = () => {
    if (isSpeecking) {
      setIsSpeecking(STOP);
      if (!isStopping && Speech.isSpeakingAsync) {
        isStopping = true;
        Speech.stop().then(() => {
          isStopping = false;
        }).catch((error) => {
          console.error("Error stopping speech:", error);
          isStopping = false;
        });
      }
    } else {
      setIsSpeecking(CONTINUE);
    }
    console.log("stop cancel sound =>", isSpeecking);
  };


  const handleSpeech = (legs) => {
    Speech.speak(legs, {
      language: 'pt-BR',
      pitch: 1,
      rate: 0.7,
      volume: 1,
      onStopped: () => {
        console.log('done speaking', isSpeecking);
        legs = "";
        cancelSound();
      },
    });
  };

  const removeHTMLTags = (text) => {
    return text.replace(/<[^>]*>/g, ''); // Expressão regular para remover tags HTML
  };
  const speech = async (result) => {
    // console.log("result in speech", result.legs[0].steps);
    if (result && result.legs) {
      // console.log("result legs in speech", result.legs);
      let currentStep = 0;
      let distanceToNextStep = 0;
      let distanceToStep = 0;
      for (const step of result.legs[0].steps) {
        distanceToNextStep += step.distance.value;
      }

      while (currentStep < result.legs[0].steps.length) {
        const step = result.legs[0].steps[currentStep];
        const cleanText = removeHTMLTags(step.html_instructions);
        handleSpeech(cleanText);

        // Aguarda o usuário se aproximar da próxima etapa
        await new Promise((resolve) => {
          const distanceToWait = distanceToNextStep - distanceToStep;
          const waitTime = Math.floor(distanceToWait / 0.5);
          // console.log("waiting for", waitTime, "seconds");
          setTimeout(resolve, waitTime * 1000);
        });

        // Verifica se o usuário interrompeu a fala
        if (!isSpeecking) {
          console.log("Speech interrupted by user");
          break;
        }

        currentStep++;
        distanceToStep = 0; // Resete distanceToStep para 0 após cada etapa
      }
    }
  };

  const onReady = (result) => {
    setDuration(result.duration)
    setDistance(result.distance)
    speech(result)
    let isObstacles = false;
    // Verifique se há obstáculos no percurso
    waypointsToAvoid.map((marker) => {
      result.coordinates.map((resultLat) => {
        if (Math.abs(resultLat.latitude - marker.latitude) <= 0.00009) {
          isObstacles = true;
        }
      });
    });

    if (isObstacles === true) {
      toast("Cuidado!", "Há obstáculos no seu percurso", "info");
    }


    mapEl.current.fitToCoordinates(
      result.coordinates.map((marker) => ({
        latitude: marker.latitude,
        longitude: marker.longitude,
      })),
      {
        edgePadding: {
          top: 50,
          bottom: 50,
          left: 50,
          right: 50,
        },
      }
    );

  };

  return (
    <SafeAreaView style={styles.containerMap}>
      <View style={{ flex: 1 }}>
        {location && (
          <MapView
            style={{ width: width, height: height }}
            initialRegion={{
              latitude: location?.coords.latitude || 0,
              longitude: location?.coords.longitude || 0,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            //onPress={onLocationSelect}
            //onPress={() => setModalVisible(!modalVisible)}
            showsUserLocation={true}
            zoomEnabled={true}
            loadingEnabled={true}
            ref={mapEl}
            provider={PROVIDER_GOOGLE}
          >
            {/* verifica se tem alguma coordenada, se tiver chama ela de m */}

            {locationM &&
              locationM.length > 0 &&
              locationM.map((m) => {
                // console.log('ver m', m);
                if (m && m.coordinate.latitude && m.coordinate.longitude) {
                  if (m.titulo == "Obras" && m.count >= 3) {
                    return (
                      <Marker
                        onPress={() => handleMarker(m)}
                        key={Math.random().toString()}
                        title={m.titulo}
                        coordinate={{
                          latitude: m.coordinate.latitude,
                          longitude: m.coordinate.longitude,
                        }}
                        icon={require("../../../assets/icons/coneObras.png")}
                      ></Marker>
                    );
                  } else if (m.titulo == "Carro" && m.count >= 3) {
                    return (
                      <Marker
                        onPress={() => handleMarker(m)}
                        key={Math.random().toString()}
                        title={m.titulo}
                        coordinate={{
                          latitude: m.coordinate.latitude,
                          longitude: m.coordinate.longitude,
                        }}
                        icon={require("../../../assets/icons/carro.png")}
                      ></Marker>
                    );
                  } else if (m.titulo == "Buraco" && m.count >= 3) {
                    return (
                      <Marker
                        onPress={() => handleMarker(m)}
                        key={Math.random().toString()}
                        title={m.titulo}
                        coordinate={{
                          latitude: m.coordinate.latitude,
                          longitude: m.coordinate.longitude,
                        }}
                        icon={require("../../../assets/icons/buraco2.png")}
                      ></Marker>
                    );
                  } else if (m.titulo == "Obstruida" && m.count >= 3) {
                    return (
                      <Marker
                      style={{width: 30, height: 30}}
                        onPress={() => handleMarker(m)}
                        key={Math.random().toString()}
                        title={m.titulo}
                        coordinate={{
                          latitude: m.coordinate.latitude,
                          longitude: m.coordinate.longitude,
                        }}
                        icon={require("../../../assets/icons/obstruida.png")}
                      ></Marker>
                    );
                  } else if (m.titulo == "SemRampa" && m.count >= 3) {
                    return (
                      <Marker
                        onPress={() => handleMarker(m)}
                        key={Math.random().toString()}
                        title={m.titulo}
                        coordinate={{
                          latitude: m.coordinate.latitude,
                          longitude: m.coordinate.longitude,
                        }}
                        icon={require("../../../assets/icons/SemRampa.png")}
                      ></Marker>
                    );
                  }
                }
                return null;
              })}

            {state.destination && (
              <Marker
                coordinate={{
                  latitude: state.destination.latitude,
                  longitude: state.destination.longitude,
                }}
                icon={require("../../../assets/icons/destino.svg")}
              ></Marker>
            )}
            {destinationPredefined ? (
              <Marker
                coordinate={{
                  latitude: destinationPredefined.latitude,
                  longitude: destinationPredefined.longitude,
                }}
                icon={require("../../../assets/icons/destino.svg")}
              ></Marker>
            ) : null}

            {/* Seu marcador personalizado */}
            {/* && Math.abs(newOriginCoords.latitude - location.coords.latitude) <= 0.00009 */}
            {/* aqui pega o range */}
            {isNewOrigin ? (
              Math.abs(newOriginCoords.latitude - location.coords.latitude) >=
                0.00009 ? (
                <Marker
                  coordinate={{
                    latitude: state.origin.latitude,
                    longitude: state.origin.longitude,
                  }}
                  icon={require("../../../assets/icons/cadeirante.png")}
                />
              ) : null
            ) : null}

            {state.destination ? (
              <MapViewDirections
                origin={state.origin}
                destination={state.destination}
                // waypoints={avoidMarkers()}
                // optimizeWaypoints={true}
                onError={() => {
                  toast("Erro ao traçar rota", "", "error")
                  handleCancel()
                }}
                language="pt-BR"
                timePrecision="now"
                apikey={config.API_KEY}
                provideRouteAlternatives={true}
                mode={"WALKING"}
                precision="high"
                geodesic={true} // Define a rota como geodésica(SE N SABE OQ É, PESQUISA NO GOOGLE! BURRO)
                avoid={"stairs"} //evitar escadas
                routingPreference="less_walking" //preferência por pouca caminhada
                accessibility="accessible"
                strokeWidth={5}
                strokeColor="#00BFFF"
                lineCap="round" // Adiciona acabamento redondo às extremidades da linha
                lineJoin="round" // Adiciona acabamento redondo aos cantos da linha
                onReady={(result) => {
                  onReady(result)
                }}
              />
            ) : (
              destinationPredefined && (
                <MapViewDirections
                  origin={state.origin}
                  destination={destinationPredefined}
                  apikey={config.API_KEY}
                  onError={() => {
                    toast("Erro ao traçar rota", "", "error")
                    handleCancel()
                  }}
                  provideRouteAlternatives={true}
                  mode={"WALKING"}
                  precision="high"
                  geodesic={true} // Define a rota como geodésica(SE N SABE OQ É, PESQUISA NO GOOGLE! BURRO)
                  avoid={"stairs"} //evitar escadas
                  routingPreference="less_walking" //preferência por pouca caminhada
                  accessibility="accessible"
                  strokeWidth={5}
                  strokeColor="#00BFFF"
                  lineCap="round" // Adiciona acabamento redondo às extremidades da linha
                  lineJoin="round" // Adiciona acabamento redondo aos cantos da linha
                  onReady={(result) => {
                    onReady(result)
                  }}
                />
              )
            )}
          </MapView>
        )}

        {/* pop up para os marcadores excluir */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible2}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible2(!modalVisible2);
          }}>

          <View style={styles.centeredView}>
            <View style={styles.modalMarkerDel}>
              <Text style={styles.textTitle}>Deseja excluir este alerta?</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => verifyMarkerToRemove()}
                  style={[styles.modalButton, styles.delButton]}>
                  <Text style={styles.textBtnDel}>Excluir</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setModalVisible2(!modalVisible2)}
                  style={[styles.modalButton, styles.cancelButton]}>
                  <Text style={styles.textBtnCancel}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

        </Modal>


        {/* pop up para os marcadores  */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >

          <View style={styles.centeredView}>
            <View style={{ borderRadius: 90 }}>
              <ImageBackground source={require('../../../assets/profile3.png')}
                resizeMode='cover'
                style={{
                  borderRadius: 20,
                  overflow: 'hidden',
                  backgroundColor: 'white',
                  padding: "7%",
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5,
                }}
              >
                <View style={styles.containerModalBg}>
                  <Image
                    style={styles.iconFechar}
                    source={require("../../../assets/icons/excluirBlue.png")}
                  />
                  <Text style={styles.modalTitulo}>Enviar um alerta</Text>

                  <TouchableOpacity
                    id="Fechar"
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Image
                      style={styles.iconFechar}
                      source={require("../../../assets/icons/fechar.png")}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.textContainerModal}>
                  <Text style={styles.modalSubtitulo}>Selecione o tipo de marcador</Text>
                </View>

                <Animatable.View
                  animation="fadeInUp"
                  delay={500}
                  style={styles.buttonsContainer}>
                  <View style={styles.buttonMarker}>

                    <TouchableOpacity
                      id="Obstruida"
                      style={styles.buttonIcon}
                      onPress={() => verifyMarker("Obstruida")}
                    >
                      <Image
                        style={styles.iconeStyle}
                        source={require("../../../assets/icons/obstruida.png")}
                      />
                    </TouchableOpacity>
                    <Text style={{ textAlign: 'center' }}>Calçada{'\n'}obstruida</Text>

                  </View>

                  <View style={styles.buttonMarker}>
                    <TouchableOpacity
                      id="Carro"
                      style={styles.buttonIcon}
                      onPress={() => verifyMarker("Carro")}
                    >
                      <Image
                        style={styles.iconeStyle}
                        source={require("../../../assets/icons/carro.png")}
                      />
                    </TouchableOpacity>
                    <Text style={{ textAlign: 'center' }}>Interferência {'\n'}de carros</Text>

                  </View>

                  <View style={styles.buttonMarker}>
                    <TouchableOpacity
                      id="Buraco"
                      style={styles.buttonIcon}
                      onPress={() => verifyMarker("Buraco")}
                    >
                      <Image
                        style={styles.iconeStyle}
                        source={require("../../../assets/icons/buraco2.png")}
                      />
                    </TouchableOpacity>
                    <Text style={{ textAlign: 'center' }}>Buracos{'\n'}no caminho</Text>

                  </View>
                </Animatable.View>

                <Animatable.View
                  animation="fadeInUp"
                  delay={500}
                  style={styles.buttonsContainer}>

                  <View style={styles.buttonMarker}>

                    <TouchableOpacity
                      id="Obras"
                      style={styles.buttonIcon}
                      onPress={() => verifyMarker("Obras")}
                    >
                      <Image
                        style={styles.iconeStyle}
                        source={require("../../../assets/icons/coneObras.png")}
                      />
                    </TouchableOpacity>
                    <Text style={{ textAlign: 'center' }}>Obras{'\n'} em andamento</Text>

                  </View>
                  <View style={styles.buttonMarker}>

                    <TouchableOpacity
                      id="SemRampa"
                      style={styles.buttonIcon}
                      onPress={() => verifyMarker("SemRampa")}
                    >
                      <Image
                        style={styles.iconeStyle}
                        source={require("../../../assets/icons/SemRampa.png")}
                      />
                    </TouchableOpacity>
                    <Text style={{ textAlign: 'center' }}>Ausência{'\n'} de rampas</Text>
                  </View>

                </Animatable.View>

              </ImageBackground>
            </View>
          </View>

        </Modal>

        <View style={styles.searchContainer}>
          {/* barra de pesquisa */}
          <GooglePlacesAutocomplete
            styles={{
              textInput: {
                borderRadius: 50,
                paddingVertical: 5,
                paddingHorizontal: 10,
                fontSize: 15,
                flex: 1,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              },
            }}
            ref={autocompleteDestinationRef}
            placeholder="Qual o seu destino?"
            onPress={(data, details = null) => {
              const destinationLocation = {
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              };
              const nameDestino = details.formatted_address;
              // console.log(details);
              setTitleDestino(nameDestino);
              dispatch({ type: "SET_DESTINATION", data: destinationLocation });
              // console.log("details: ",details)
            }}
            // predefinedPlaces={predefinedPlacesCurrent}
            enablePoweredByContainer={false}
            fetchDetails={true}
            query={{
              key: config.API_KEY,
              language: "pt-BR",
              components: "country:BR",
              radius: 10000
            }}
          />
          {state.destination && (
            <GooglePlacesAutocomplete
              styles={{
                textInput: {
                  borderRadius: 50,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  fontSize: 15,
                  flex: 1,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                },
              }}
              ref={autocompleteRef}
              placeholder={titleLocation}
              onPress={(data, details = null) => {
                const originLocation = {
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                };
                if (
                  originLocation.latitude == null &&
                  originLocation.longitude == null
                ) {
                  dispatch({ type: "SET_ORIGIN", data: location });
                } else {
                  dispatch({ type: "SET_ORIGIN", data: originLocation });
                  setNewOriginCoords(originLocation);
                  const confirmar = true;
                  // setFavoriteRoute((prevState) => ({ ...prevState, ...favoriteRouter }));
                  setisNewOrigin((prevState) => ({ ...prevState, ...confirmar }));
                  console.log("new origin ", isNewOrigin);
                }
              }}
              predefinedPlaces={[
                {
                  type: "favorite",
                  description: "Onde estou",
                  geometry: { location: { lat: latAux, lng: lngAux } },
                },
              ]}
              enablePoweredByContainer={false}
              fetchDetails={true}
              query={{
                key: config.API_KEY,
                language: "pt-BR",
                components: "country:BR",
                radius:10000
              }}
            />)}
        </View>
      </View>

      {state.destination ? (
        <View style={styles.buttonInfo}>
          <Text style={styles.infoText}>
            {" "}
            {Math.round(distance) < 1
              ? Math.round(distance * 100) + " m"
              : Math.round(distance) + " Km"}
          </Text>
          <Text style={styles.infoText}>
            {" "}
            {Math.round(duration) < 60
              ? Math.round(duration) + " min"
              : Math.round(duration / 60) + " h" &&
                Math.round(duration) > 1440
                ? Math.round(duration / 1440) + " dias"
                : Math.round(duration / 60) + " h"}
          </Text>
        </View>
      ) : (
        destinationPredefined && (
          <View>
            <Text style={styles.infoText}>
              {" "}
              {Math.round(distance) < 1
                ? Math.round(distance * 100) + "m"
                : Math.round(distance) + "Km"}
            </Text>
            <Text style={styles.infoText}>
              {" "}

              {Math.round(duration) < 60
                ? Math.round(duration) + " min"
                : Math.round(duration / 60) + " h" &&
                  Math.round(duration) > 1440
                  ? Math.round(duration / 1440) + " dias"
                  : Math.round(duration / 60) + " h"}
            </Text>
          </View>
        )
      )}

      <TouchableOpacity
        style={styles.buttonAlert}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Image
          style={styles.iconButtons}
          source={require("../../../assets/icons/alerta.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonCenter}
        title="re-centralizar" onPress={handleRecenter}>
        <Image
          style={styles.iconButtons}
          source={require("../../../assets/icons/centralizar.png")} />
      </TouchableOpacity>
      {state.destination ? (
        <>
          <TouchableOpacity
            style={styles.buttonCancel}
            title="Cancelar rota"
            onPress={handleCancel}>
            <Image
              style={styles.iconButtons}
              source={require("../../../assets/icons/cancelar.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonAudio}
            title="Cancelar rota"
            onPress={cancelSound}
          >
            <Image
              style={styles.iconBtnAudio}
              source={
                isSpeecking
                  ? require("../../../assets/icons/icons8-sem-áudio-50.png")
                  : require("../../../assets/icons/icons8-som-50.png")
              }
            />
          </TouchableOpacity>
        </>
      ) : destinationPredefined ? (
        <>
          <TouchableOpacity
            style={styles.buttonCancel}
            title="Cancelar rota"
            onPress={handleCancel}>
            <Image
              style={styles.iconButtons}
              source={require("../../../assets/icons/cancelar.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonAudio}
            title="Cancelar rota"
            onPress={cancelSound}
          >
            <Image
              style={styles.iconBtnAudio}
              source={
                isSpeecking
                  ? require("../../../assets/icons/icons8-sem-áudio-50.png")
                  : require("../../../assets/icons/icons8-som-50.png")
              }
            />
          </TouchableOpacity>
        </>
      ) : null
      }


    </SafeAreaView >
  );
};
export default Map;