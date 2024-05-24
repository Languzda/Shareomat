import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { OfferViewPropsType } from '../../types/OfferViewPropsType';
import { OfferType } from '../../types/OfferType';
import { styles } from './Styles';
import { getOfferById } from '../../controllers/OfferController';
import { AuthContext } from '../../store/authContext';

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

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>
        {offer ? offer.name : "chwila..."}
      </Text>
      <Text style={styles.sectionDescription}>
        {offer?.date_added}
      </Text>
    </View>
  )
}

export default OfferViewScreen;