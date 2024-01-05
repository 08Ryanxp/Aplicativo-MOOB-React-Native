import React from 'react';
import { ImageBackground, 
    SafeAreaView, 
    Text, 
    Dimensions, 
    TouchableOpacity, 
    View,
    StatusBar
} from 'react-native';
import styles from './style';
import { useNavigation } from "@react-navigation/native";
import {
    useFonts,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
} from "@expo-google-fonts/inter";
import {
    requestForegroundPermissionsAsync
  } from "expo-location";

const Width = Dimensions.get("window").width;
const Height = Dimensions.get("window").height;

export default function Welcome(){
    const navigation = useNavigation();
    const [fontLoaded] = useFonts({
        Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold,
    });
    
    if (!fontLoaded) {
        return null;
    }

    async function LocationPermission() {
        const { granted } = await requestForegroundPermissionsAsync();
        if (granted) {
            navigation.navigate('Login')
        }
      }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar/>
            <ImageBackground 
            source={require('../../../assets/welcome.png')} resizeMode='contain'
            style={{width: Width, height: Height, alignItems: 'center', justifyContent: 'center'}}>

                <Text style={styles.title}>Bem-Vindo(a) ao MOOB!</Text>

                <Text style={styles.subTitle}>Olá! Este é o seu aplicativo de mobilidade urbana e
                    guia com locais acessíveis.</Text>

                <Text style={styles.textLoc}>Localização - GPS</Text>

                <Text style={styles.textDesc}>Nosso mapa e nossas sugestões de locais acessíveis são baseadas na sua localização para garantir melhor experiência.</Text>

                <Text style={styles.finalText}>Podemos prosseguir?</Text>         

                <View style={styles.containerButton}>
                    <TouchableOpacity 
                    onPress={LocationPermission} style={styles.buttonLoc}>
                        <Text style={styles.buttonText}>Solicitar localização</Text>
                    </TouchableOpacity>
                </View>

            </ImageBackground>
        </SafeAreaView>
    );
}