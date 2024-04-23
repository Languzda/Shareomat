/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {OfferItem} from './components/OfferItem';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  //var response = await fetch('');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  let offers = dummyData.map((offer, index) => <OfferItem key={`offer${index}`} {...offer} />);

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
          {offers}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;

const dummyData = [
  {
    name: "offer1",
    type: "type1",
    description: "description1",
    limit: 1,
    price: 5.99,
    photo: "photo1",
    card_id: 1,
    status: "active",
  },
  {
    name: "offer2",
    type: "type2",
    description: "description2",
    limit: 2,
    price: 6.99,
    photo: "photo2",
    card_id: 2,
    status: "active",
  },
  {
    name: "offer3",
    type: "type3",
    description: "description3",
    limit: 3,
    price: 7.99,
    photo: "photo3",
    card_id: 3,
    status: "active",
  },
  {
    name: "offer4",
    type: "type4",
    description: "description4",
    limit: 4,
    price: 8.99,
    photo: "photo4",
    card_id: 4,
    status: "active",
  },
  {
    name: "offer5",
    type: "type5",
    description: "description5",
    limit: 5,
    price: 9.99,
    photo: "photo5",
    card_id: 5,
    status: "active",
  },
  {
    name: "offer6",
    type: "type6",
    description: "description6",
    limit: 6,
    price: 10.99,
    photo: "photo6",
    card_id: 6,
    status: "active",
  },
  {
    name: "offer7",
    type: "type7",
    description: "description7",
    limit: 7,
    price: 11.99,
    photo: "photo7",
    card_id: 7,
    status: "active",
  },
  {
    name: "offer8",
    type: "type8",
    description: "description8",
    limit: 8,
    price: 12.99,
    photo: "photo8",
    card_id: 8,
    status: "active",
  },
  {
    name: "offer9",
    type: "type9",
    description: "description9",
    limit: 9,
    price: 13.99,
    photo: "photo9",
    card_id: 9,
    status: "active",
  },
  {
    name: "offer10",
    type: "type10",
    description: "description10",
    limit: 10,
    price: 14.99,
    photo: "photo10",
    card_id: 10,
    status: "active",
  },
];