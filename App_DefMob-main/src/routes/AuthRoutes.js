import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditProfile from "../screens/EditProfile";
import { EditRoutes } from "../screens/EditRoutes/EditRoutes";
import Contact from "../screens/Support/Contact";
import About from "../screens/AboutScreen";
import BottomTabNavigation from "./TabNavigator";
const Stack = createNativeStackNavigator();

export default function AuthRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabNavigation"
        component={BottomTabNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditRoutes"
        component={EditRoutes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Contact"
        component={Contact}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
