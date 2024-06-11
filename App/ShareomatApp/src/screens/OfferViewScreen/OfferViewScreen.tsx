import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, Text, View, useColorScheme } from 'react-native';
import { OfferViewPropsType } from '../../types/OfferViewPropsType';
import { OfferType } from '../../types/OfferType';
import { backgroundStyle, styles } from './Styles';
import { getOfferById } from '../../controllers/OfferController';
import { AuthContext } from '../../store/authContext';
import { Button } from 'react-native-elements';

function OfferViewScreen({ route, navigation }: OfferViewPropsType): React.JSX.Element {
  const id = route.params.id
  const context = useContext(AuthContext);

  const [offer, setOffer] = useState<OfferType>();

  useEffect(() => {
    async function getOffer() {
      const offer = await getOfferById(id, context.token);
      setOffer(offer);
    };

    if (!offer) {
      getOffer();
    }
  });

  function onPressActivate() {
    navigation.navigate("Barcode", {id: offer?.card_id});
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>
          {offer ? offer.name : "chwila..."}
        </Text>
        {offer ?
          <Text style={styles.sectionDescription}>
            cena: {offer?.price} zł{"\n"}
            limit: {offer?.limit}{"\n"}
            dodano: {offer?.date_added?.slice(0,10)} {offer?.date_added?.slice(11,19)}
          </Text> : ""
        }
        {offer ?
          <Button
            onPress={onPressActivate}
            title="aktywuj"
          /> : ""
        }
      </View>
    </SafeAreaView>
  )
}

export default OfferViewScreen;