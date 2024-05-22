import React, { useEffect, useState } from 'react';
import { ScrollView, Text, useColorScheme, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { OfferListItem } from '../../components/OfferListItem/OfferListItem';
import { ListOfferType } from '../../types/ListOfferType';
import { styles } from './Styles';
import { OfferListPropsType } from '../../types/OfferListPropsType';
import { FAB, Icon } from "react-native-elements";
import { getActiveOffers as _getActiveOffers } from '../../controllers/OfferController';

function OfferListScreen({ route, navigation }: OfferListPropsType): React.JSX.Element {
  function onOfferPressed(id: number) {
    navigation.navigate("OfferView", {id});
  }

  function onFABPress() {
    navigation.navigate("AddOffer");
  }

  const isDarkMode = useColorScheme() === 'dark';
  const [activeOffers, setActiveOffers] = useState<ListOfferType[]>([]);

  useEffect(() => {
    async function getActiveOffers() {
      const offers = await _getActiveOffers();
      setActiveOffers(await offers);
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
    <View style={{height: '100%'}}>
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
      <FAB placement="right" icon={<Icon type="font-awesome-5" name="plus" color="white" />} onPress={onFABPress} />
    </View>
  );
}

export default OfferListScreen;