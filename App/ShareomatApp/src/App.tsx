/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {OfferItem} from './components/OfferItem';
import {OfferType} from './OfferType';
import {styles} from './Styles';

function App(): React.JSX.Element {
  const ip = '172.27.112.1';
  const port = '3001';

  const isDarkMode = useColorScheme() === 'dark';
  const [activeOffers, setActiveOffers] = useState<OfferType[]>([]);

  useEffect(() => {
    async function getActiveOffers() {
      const response = await fetch(`http://${ip}:${port}/offer/getActiveOffers`);
      setActiveOffers(await response.json());
    };
    
    if (activeOffers.length == 0) {
      getActiveOffers();
    }
  });

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  let offers = activeOffers.map((offer, index) => <OfferItem key={`offer${index}`} {...offer} />);
  let waiting = (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
      ]}>
        Waiting for offers...
      </Text>
    </View>);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          {activeOffers.length > 0 ? offers : waiting}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;