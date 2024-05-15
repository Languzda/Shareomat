import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar, useColorScheme } from "react-native";
import { StackParamListType } from "../../types/StackParamListType";
import { Colors } from "react-native/Libraries/NewAppScreen";
import OfferListScreen from "../OfferListScreen/OfferListScreen";
import OfferViewScreen from "../OfferViewScreen/OfferViewScreen";

const Stack = createNativeStackNavigator<StackParamListType>();

function AppScreen(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Stack.Navigator>
        <Stack.Screen name="OfferList" component={OfferListScreen} />
        <Stack.Screen name="OfferView" component={OfferViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppScreen;