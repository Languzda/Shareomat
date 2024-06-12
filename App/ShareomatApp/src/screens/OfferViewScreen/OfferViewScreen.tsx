import React, {useContext} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {OfferViewPropsType} from '../../types/OfferViewPropsType';
import {backgroundStyle, styles} from './Styles';
import {AuthContext} from '../../store/authContext';
import {Button} from 'react-native-elements';

function OfferViewScreen({
  route,
  navigation,
}: OfferViewPropsType): React.JSX.Element {
  const context = useContext(AuthContext);

  const offer = route.params.offer;

  function onPressActivate() {
    navigation.navigate('Barcode', {id: offer?.card_id});
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>
          {offer ? offer.name : 'chwila...'}
        </Text>
        {offer ? (
          <Text style={styles.sectionDescription}>
            cena: {offer?.price} zł{'\n'}
            limit: {offer?.limit}
            {'\n'}
            dodano: {offer?.date_added?.slice(0, 10)}{' '}
            {offer?.date_added?.slice(11, 19)}
          </Text>
        ) : (
          ''
        )}
        {offer ? <Button onPress={onPressActivate} title="aktywuj" /> : ''}
      </View>
    </SafeAreaView>
  );
}

export default OfferViewScreen;
