import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StatusBar, useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { DrawerParamListType } from "../../types/DrawerParamListType";
import ActiveOffersScreen from "../ActiveOffersScreen/ActiveOffersScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";

const Drawer = createDrawerNavigator<DrawerParamListType>();

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
      <Drawer.Navigator>
        <Drawer.Screen name="ActiveOffers" component={ActiveOffersScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default AppScreen;