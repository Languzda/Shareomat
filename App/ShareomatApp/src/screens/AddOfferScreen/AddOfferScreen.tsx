import React, { useContext, useState } from 'react';
import { AddOfferPropsType } from '../../types/AddOfferPropsType';
import {
  Alert,
  Button,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import { addOffer } from '../../controllers/OfferController';
import { AuthContext } from '../../store/authContext';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Dropdown } from 'react-native-element-dropdown';
import { color } from 'react-native-elements/dist/helpers';
import { useFocusEffect } from '@react-navigation/native';
import { getUserCards as _getUserCards } from '../../controllers/CardController';
import DropDownPicker from 'react-native-dropdown-picker';
import { styles } from './Styles';
import RNPickerSelect from 'react-native-picker-select';

function AddOfferScreen({
  navigation,
  route,
}: AddOfferPropsType): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const context = useContext(AuthContext);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [limit, setLimit] = useState(Number);
  const [price, setPrice] = useState(Number);
  const [card_id, setCardId] = useState('');
  const [photo, setPhoto] = useState('');
  const [image, setImage] = useState<Asset | undefined>(undefined);

  const status = 'active';

  const [userCards, setUserCards] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  useFocusEffect(() => {
    async function getUserCards() {
      const cards = await _getUserCards(context.token, context.userId);

      setUserCards(cards.map((e: { card_id: any; }) => e.card_id));
    }

    if (userCards.length === 0) {
      getUserCards().then(() => {
        console.log(userCards);
      });
    }
  });

  function onPressUploadPhoto() {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.assets && response.assets.length == 1) {
        setImage(response.assets[0]);
      }
    });
  }

  async function onPressAddOffer() {
    /*if (!image) {
      return;
    }*/

    const response = await addOffer(context.token, {
      name,
      type,
      description,
      limit,
      price,
      photo,
      card_id,
      status,
      image,
    });
  }

  return (
    <ScrollView style={backgroundStyle}>
      <View style={styles.offer_view}>

        {image && (
          <Image source={{ uri: image.uri }} style={styles.image} />
        )}

        <Pressable
          style={styles.button}
          onPress={onPressUploadPhoto}>
          <Text style={styles.button_text}>dodaj zdjęcie</Text>
        </Pressable>

        <TextInput
          style={styles.input}
          placeholder="nazwa oferty"
          onChangeText={setName} />

        <TextInput
          style={styles.input}
          placeholder="typ oferty"
          onChangeText={setType} />

        <TextInput
          style={styles.input}
          placeholder="opis"
          onChangeText={setDescription}
          multiline={true}
          numberOfLines={3}
        />

        <TextInput
          style={styles.input}
          placeholder="limit (liczba)"
          onChangeText={value => setLimit(parseInt(value))}
          inputMode="decimal"
        />

        <TextInput
          style={styles.input}
          placeholder="cena (z kropką)"
          onChangeText={value => setPrice(parseFloat(value))}
          inputMode="decimal"
        />

        {userCards.length == 0 ? (
          <Text> Proszę najpierw dodać kartę </Text>
        ) : (
          /*<DropDownPicker
            value={card_id}
            items={userCards.map(card => ({ label: card, value: card }))}
            setValue={setCardId}
            multiple={false}
            open={open}
            setOpen={setOpen}
            containerStyle={{ height: 80 }}
            dropDownContainerStyle={styles.dropdown_container}
            selectedItemContainerStyle={styles.dropdown_item}
          />*/
          <RNPickerSelect
            onValueChange={(value) => setCardId(value)}
            items={userCards.map(card => ({ label: card, value: card }))}
            placeholder={{label: "wybierz kartę"}}
          />
        )}

        <Pressable
          style={styles.button}
          onPress={onPressAddOffer}>
          <Text style={styles.button_text}>dodaj ofertę</Text>
        </Pressable>

      </View>
    </ScrollView>
  );
}

export default AddOfferScreen;
