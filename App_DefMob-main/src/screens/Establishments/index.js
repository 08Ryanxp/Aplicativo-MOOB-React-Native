import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
    ImageBackground,
    TouchableHighlight
} from "react-native";
import { Button, Searchbar } from 'react-native-paper';
import styles from './style';
import {
    useFonts,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
} from "@expo-google-fonts/inter";
import * as Location from "expo-location";
import config from "../../config/index.json"
import { useIsFocused } from "@react-navigation/native";
import {

    useNavigation

} from "@react-navigation/native";


const traduz = (type) => {
    switch (type) {
        case "restaurant":
            return "Restaurante";
        case "bar":
            return "Bar";
        case "movie_theater":
            return "Cinema";
        case "amusement_park":
            return "Parque de diversões";
        case "park":
            return "Parque";
        default:
            return type;
    }
};
const defaultImage = (type) => {
    switch (type) {
        case "restaurant":
            return require("../../../assets/typeFavorite/restaurante.png");
        case "bar":
            return require("../../../assets/typeFavorite/mercado.png");
        case "movie_theater":
            return require("../../../assets/typeFavorite/shopping.png");
        case "amusement_park":
            return require("../../../assets/typeFavorite/lazer.png");
        case "park":
            return require("../../../assets/typeFavorite/parque.png");
        default:
            return require("../../../assets/typeFavorite/outros.png");
    }
};


export default function Establishments() {

    const data = [
        {
            id: 1,
            img: require('../../../assets/images/imageCard1.jpg'),
            titleCarousel: "Shopping Boulevard",
            addressCarousel: "Av. João Durval Carneiro, 3665 - Caseb",
            coords: { lat: -12.241170859817398, lng: -38.94865066277838 }
        },
        {
            id: 2,
            img: require('../../../assets/images/imageCard2.jpg'),
            titleCarousel: "Shopping Avenida",
            addressCarousel: "Av. Nóide Cerqueira, 5710 - Sim",
            coords: { lat: -12.255690242708097, lng: -38.92098493394183 }
        },
        {
            id: 3,
            img: require('../../../assets/images/imageCard3.jpg'),
            titleCarousel: "Centro de Cultura Amélio Amorim",
            addressCarousel: "Av. Pres. Dutra, 2222 - Centro",
            coords: { lat: -12.264141336011368, lng: -38.945097662777776 }
        },
    ];
    



    const navigation = useNavigation();
    const { width } = Dimensions.get('window');
    const [searchQuery, setSearchQuery] = useState('');
    const [places, setPlaces] = useState(null);

    const [locationC, setLocationC] = useState(null);
    const isFocused = useIsFocused();

    const [fontLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
        Inter_700Bold,
        Inter_800ExtraBold,
    });
    useEffect(() => {
        if (isFocused) {
            getLocation()
            // establishmentsNearby()
        }
    }, [isFocused])
    useEffect(() => {
        if (isFocused && locationC) {
            // getLocation()
            establishmentsNearby()
        }
    }, [isFocused, locationC])

    if (!fontLoaded) {
        return null;
    }
    async function getLocation() {
        try {
            let location = await Location.getCurrentPositionAsync();
            // console.log("Localização:", location);
            const coordenadas = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            }
            // console.log("Localização:", coordenadas);
            setLocationC(coordenadas)

        } catch (error) {
            console.log("Erro ao obter a localização:", error);
        }
    }
    const routesDestTransfer = (address, nameDest, navigation) => {
        // routeTranfer = address.geometry.location
        console.log("adress lat", address.lng)
        console.log("nome", nameDest)
        const routeTranfer = {
            latitude: address.lat,
            longitude: address.lng,
        }
        try {
            // console.log("async :", address);
            // Verificar se há dados em routeTranfer
            if (address && address.lat && address.lng) {
                // Navegar para outro arquivo usando o navigation
                navigation.navigate("Mapa", { routeTranfer, nameDest });
            } else {
                console.warn("Dados de rota inválidos.");
            }

            return address;
        } catch (err) {
            console.log("LÁGRIMAS EM tranfer => ", err);
            throw err;
        }
    };

    const establishmentsNearby = async () => {

        // console.log("clicou", locationC)
        try {
            if (!locationC || !locationC.latitude || !locationC.longitude) {
                console.log("caiu no if")
                return;
            }
            // console.log("fora do if, dentro do try")
            const apiKey = config.API_KEY;
            const radius = 2500;
            const type = 'restaurant|bar|movie_theater|amusement_park|park';
            const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${locationC.latitude},${locationC.longitude}&radius=${radius}&type=${type}&key=${apiKey}`;

            const response = await fetch(url);
            const data = await response.json();
            if (data.results) {
                setPlaces(data.results)
            }
            // console.log("data", data, "\nplaces", data.results, "\nname", data.results.name);
        } catch (err) {
            console.log("Erro em fetchNearbyPlaces:", err);
        };
        // console.log("estabelecimentos próximos =>", locationC);
    };
    const filteredEstablishments = async (type) => {
        try {
            if (!locationC || !locationC.latitude || !locationC.longitude) {
                console.log("caiu no if")
                return;
            }
            // console.log("fora do if, dentro do try")
            const apiKey = config.API_KEY;
            const radius = 2500;
            const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${locationC.latitude},${locationC.longitude}&radius=${radius}&type=${type}&key=${apiKey}`;

            const response = await fetch(url);
            const data = await response.json();
            if (data.results) {
                setPlaces(data.results)
            }
            // console.log("data", data, "\nplaces", data.results, "\nname", data.results.name);
        } catch (err) {
            console.log("Erro em fetchNearbyPlaces:", err);
        };
    }

    const searchEstablishments = async (searchText) => {
        console.log("search", searchText);
        try {
            const apiKey = config.API_KEY;
            const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchText}&key=${apiKey}`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.results) {
                setPlaces(data.results);
            }
        } catch (err) {
            console.log("Erro ao pesquisar:", err);
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar />
            <ScrollView>
                <View style={styles.containerSearch}>
                    <Searchbar
                        iconColor="#FBA708"
                        placeholder="Encontre o que você procura"
                        onChangeText={setSearchQuery} // Atualize o estado do texto de pesquisa
                        value={searchQuery} // Defina o valor do texto de pesquisa
                        onSubmitEditing={() => searchEstablishments(searchQuery)} // Chame a função de pesquisa
                        style={styles.searchStyle}
                    />
                </View>
                <View style={styles.containerCategory}>
                    <Text style={styles.titles}>Categorias</Text>
                    <View style={styles.rowCategory}>
                        <TouchableOpacity
                            onPress={() => filteredEstablishments("grocery_or_supermarket")}
                            style={styles.buttonCategory}>
                            <Image source={require('../../../assets/icons/cesta.png')}
                                style={styles.iconButton}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => filteredEstablishments("bank|finance|insurance_agency")}
                            style={styles.buttonCategory}>
                            <Image source={require('../../../assets/icons/banco.png')}
                                style={styles.iconButton}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => filteredEstablishments("restaurant")}
                            style={styles.buttonCategory}>
                            <Image source={require('../../../assets/icons/restaurante.png')}
                                style={styles.iconButton}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => filteredEstablishments("hospital|emergency_room")}
                            style={styles.buttonCategory}>
                            <Image source={require('../../../assets/icons/hospital.png')}
                                style={styles.iconButton}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => filteredEstablishments("movie_theater|amusement_park|park|bar")}
                            style={styles.buttonCategory}>
                            <Image source={require('../../../assets/icons/lazer.png')}
                                style={styles.iconButton}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.containerTitleCarousel}>
                    <Text style={styles.titles}>Recomendados</Text>
                </View>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={data}
                    keyExtractor={(item) => String(item.id)}
                    horizontal
                    snapToAlignment="start"
                    scrollEventThrottle={16}
                    decelerationRate="fast"
                    snapToOffsets={[...Array(data.length)].map((x, i) => i * (width * 0.8 - 40) + (i - 1) * 40)}
                    renderItem={({ item }) =>
                        <ImageBackground
                            source={item.img}
                            style={styles.styleCardCarousel}>
                            <TouchableOpacity 
                            onPress={()=>routesDestTransfer(item.coords,item.titleCarousel,navigation)}
                            style={styles.btnRouteCarousel}>
                                <Image style={styles.iconRouteCarousel}
                                    source={require('../../../assets/icons/setaRotas.png')} tintColor={'#fff'} />
                            </TouchableOpacity>
                            <View style={styles.contentCarousel}>
                                <Text style={styles.titleCarousel}>{item.titleCarousel}</Text>
                                <Text style={styles.addressCarousel}>{item.addressCarousel}</Text>
                            </View>
                        </ImageBackground>
                    }
                />
                {locationC && places && (
                    <View style={styles.containerCards}>
                        <Text style={styles.titles}>Próximos de você</Text>
                        {places.map((place, index) => (
                            <View key={index} style={styles.card}>

                                {place.photos && place.photos.length > 0 && place.photos[0].photo_reference ? (
                                    <Image
                                        style={styles.imageCard}
                                        source={{
                                            uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${config.API_KEY}`
                                        }}
                                    />
                                ) : (
                                    <Image
                                        style={styles.imageCard}
                                        source={defaultImage(place.types[0])}
                                    />
                                )}
                                <View style={styles.TextCard}>
                                    <Text style={styles.nameLocation}>{place.name}</Text>
                                    <Text style={styles.nameCategory}>{traduz(place.types[0])}</Text>
                                    <Text style={styles.address}>{place.vicinity}</Text>
                                    <View style={styles.textAndButton}>
                                        <Text style={styles.distance}>{place.distance}</Text>
                                        <TouchableOpacity onPress={() => routesDestTransfer(place.geometry.location, place.name, navigation)}>
                                            <Image
                                                style={styles.iconRoute}
                                                source={require('../../../assets/icons/setaRotas.png')}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );

}