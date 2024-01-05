import AuthRoutes from "./AuthRoutes";
import NoAuthRoutes from "./NoAuthRoutes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/auth";

const Stack = createNativeStackNavigator();

export default function ProtectedRoutes() {
  const {authData} = useAuth();

  return (
    <Stack.Navigator>
      {authData ? (
        <Stack.Group>
          <Stack.Screen
            name="AuthRoutes"
            component={AuthRoutes}
            options={{ headerShown: false }}
          />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen
            name="NoAuthRoutes"
            component={NoAuthRoutes}
            options={{ headerShown: false }}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}
