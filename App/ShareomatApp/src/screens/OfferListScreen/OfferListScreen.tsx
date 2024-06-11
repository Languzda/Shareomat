import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, useColorScheme, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { OfferListItem } from '../../components/OfferListItem/OfferListItem';
import { ListOfferType } from '../../types/ListOfferType';
import { styles } from './Styles';
import { OfferListPropsType } from '../../types/OfferListPropsType';
import { FAB, Icon } from "react-native-elements";
import { getActiveOffers as _getActiveOffers } from '../../controllers/OfferController';
import { AuthContext } from '../../store/authContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

function OfferListScreen({ route, navigation }: OfferListPropsType): React.JSX.Element {
  function onOfferPressed(id: number) {
    navigation.navigate("OfferView", {id});
  }

  function onFABPress() {
    navigation.navigate("AddOffer");
  }

  const isDarkMode = useColorScheme() === 'dark';
  const [activeOffers, setActiveOffers] = useState<ListOfferType[]>([]);
  const context = useContext(AuthContext);

  useFocusEffect(() => {
    async function getActiveOffers() {
      const offers = await _getActiveOffers(context.token);
      setActiveOffers(await offers);
    };
  
    getActiveOffers();
  })

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1
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
    <SafeAreaView style={{height: '100%'}}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
          {activeOffers.length > 0 ? offers : waiting}
      </ScrollView>
      <FAB placement="right" icon={<Icon type="font-awesome-5" name="plus" color="white" />} onPress={onFABPress} />
    </SafeAreaView>
  );
}

export default OfferListScreen;