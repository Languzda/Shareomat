import { useContext } from "react";
import AppScreen from "../AppScreen/AppScreen";
import LogInScreen from "../LogInScreen/LogInScreen";
import { AuthContext } from "../../store/authContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogInParamListType } from "../../types/LogInStackParamListType";
import RegisterScreen from "../RegisterScreen/RegisterScreen";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator<LogInParamListType>();

function HandleLogInScreen(): React.JSX.Element {
  const context = useContext(AuthContext);

  if (context.isAuthenticated) {
    return (
      <AppScreen />
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="LogIn" component={LogInScreen} options={{ title: "Logowanie" }}/>
          <Stack.Screen name="Register" component={RegisterScreen} options={{ title: "Rejestracja" }}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default HandleLogInScreen;