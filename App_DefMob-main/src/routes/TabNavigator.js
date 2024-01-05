import React, { useState, useEffect } from "react";
import { Keyboard, View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Map from "../screens/Map";
import Profile from "../screens/Profile";
import PredefinedPlaces from "../screens/SaveRoutes/PredefinedRoutes";
import Establishments from "../screens/Establishments";

const Tab = createBottomTabNavigator();
const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconLabel: {
    fontSize: 10,
    color: "#2d68ff",
    marginTop: 3,
  },
  tabBarStyle: {
    backgroundColor: "#fff",
    elevation: 5,
    borderTopWidth: 1,
    borderTopColor: "#d6d6d6",
    height: "7%"
  },
});

const BottomTabNavigation = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Mapa"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let label;

          switch (route.name) {
            case "Mapa":
              iconName = focused ? "map" : "map-outline";
              label = "Mapa";
              break;
            case "Rotas Salvas":
              iconName = focused ? "trail-sign" : "trail-sign-outline";
              label = "Rotas Favoritas";
              break;
            case "Estabelecimentos":
              iconName = focused ? "business" : "business-outline";
              label = "Estabelecimentos";
              break;
            case "Perfil":
              iconName = focused ? "person" : "person-outline";
              label = "Perfil";
              break;
          }

          return (
            <View style={styles.iconContainer}>
              <Ionicons name={iconName} size={size} color={color} />
              {focused && <Text style={styles.iconLabel}>{label}</Text>}
            </View>
          );
        },
        tabBarActiveTintColor: "#2d68ff",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        tabBarStyle: {
          ...styles.tabBarStyle,
          display: keyboardVisible ? "none" : "flex",
        },
      })}
    >
      <Tab.Screen
        name="Mapa"
        component={Map}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Rotas Salvas"
        component={PredefinedPlaces}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Estabelecimentos"
        component={Establishments}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
