import { CommonActions, NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar, useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { TabParamListType } from "../../types/TabParamListType";
import ActiveOffersScreen from "../ActiveOffersScreen/ActiveOffersScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";
import { Icon } from "react-native-elements";

const Tab = createBottomTabNavigator<TabParamListType>();

function AppScreen(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const navigationRef = useNavigationContainerRef();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Tab.Navigator>
        <Tab.Screen
          name="ActiveOffers"
          component={ActiveOffersScreen}
          options={{
            headerShown: false,
            tabBarIcon: (props) => <Icon type="font-awesome-5" name="list" color={props.color} size={props.size}/>,
          }}
          listeners={{tabPress: (e) => {
            e.preventDefault();
            navigationRef.dispatch(CommonActions.navigate({name: "OfferList"}));
          }}}/>
        <Tab.Screen 
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: (props) => <Icon type="font-awesome-5" name="user" color={props.color} size={props.size}/>,
          }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppScreen;