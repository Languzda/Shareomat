import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  useColorScheme,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import OfferList from './components/OfferList';
import { StackParamListType } from './types/StackParamListType';
import OfferView from './components/OfferView';

const Stack = createNativeStackNavigator<StackParamListType>();

function App(): React.JSX.Element {
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
        <Stack.Screen name="OfferList" component={OfferList} />
        <Stack.Screen name="OfferView" component={OfferView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;