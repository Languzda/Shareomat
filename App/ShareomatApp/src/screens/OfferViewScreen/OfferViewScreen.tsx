import React, {useContext} from 'react';
import {Alert, SafeAreaView, Text, View, Image} from 'react-native';
import {OfferViewPropsType} from '../../types/OfferViewPropsType';
import {backgroundStyle, styles} from './Styles';
import {AuthContext} from '../../store/authContext';
import {Button} from 'react-native-elements';
import { useOffer } from '../../controllers/OfferController';

const ip = process.env.IP;
const port = process.env.PORT;

function OfferViewScreen({
  route,
  navigation,
}: OfferViewPropsType): React.JSX.Element {
  const context = useContext(AuthContext);

  const offer = route.params.offer;
  

  async function onPressActivate() {
    const response = await useOffer(offer.id, context.token);

    Alert.alert(response.message);
    navigation.navigate('Barcode', {id: offer?.card_id});
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={styles.sectionContainer}>
        <Image source={{uri: `http://${ip}:${port}/${offer.photo}`}} style={{aspectRatio: '1/1'}}/>
        <Text style={styles.sectionTitle}>
          {offer ? offer.name : 'chwila...'}
        </Text>
        {offer ? (
          <Text style={styles.sectionDescription}>
            {offer?.description}{'\n\n'}
            typ: {offer?.type}{'\n'}
            cena: {offer?.price} zł{'\n'}
            limit: {offer?.limit}{'\n'}
            dodano: {offer?.date_added?.slice(0, 10)}{' '}{offer?.date_added?.slice(11, 19)}{'\n'}
            active?: {offer.status}
          </Text>
        ) : (
          ''
        )}
        {offer.status === 'active' ? <Button onPress={onPressActivate} title="aktywuj" /> : ''}
      </View>
    </SafeAreaView>
  );
}

export default OfferViewScreen;
