import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { OfferListItem } from '../../components/OfferListItem/OfferListItem';
import { ListOfferType } from '../../types/ListOfferType';
import { styles } from './Styles';
import { OfferListPropsType } from '../../types/OfferListPropsType';

function OfferListScreen({ route, navigation }: OfferListPropsType): React.JSX.Element {
  function onOfferPressed(id: number) {
    navigation.navigate("OfferView", {id});
  }

  const ip = '172.27.112.1';
  const port = '3001';

  const isDarkMode = useColorScheme() === 'dark';
  const [activeOffers, setActiveOffers] = useState<ListOfferType[]>([]);

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

  let offers = activeOffers.map((offer, index) => <OfferListItem key={`offer${index}`} {...offer} onPress={onOfferPressed}/>);
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
  );
}

export default OfferListScreen;