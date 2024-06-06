import React, { useContext, useState } from "react";
import { AddOfferPropsType } from "../../types/AddOfferPropsType";
import { Button, Image, ScrollView, TextInput, View } from "react-native";
import { Asset, launchImageLibrary } from "react-native-image-picker";
import { addOffer } from "../../controllers/OfferController";
import { AuthContext } from "../../store/authContext";

function AddOfferScreen({navigation, route}: AddOfferPropsType): React.JSX.Element {
  const context = useContext(AuthContext);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [limit, setLimit] = useState('');
  const [price, setPrice] = useState(0);
  const [card_id, setCardId] = useState(0);
  const [image, setImage] = useState<Asset>();
  const status = 'Active';

  function onPressUploadPhoto() {
    launchImageLibrary({mediaType: "photo"}, (response) => {
      
      if (response.assets && response.assets.length == 1) {
        setImage(response.assets[0]);
      }
    });
  }

  async function onPressAddOffer() {
    if (!image) {
      return;
    }

    const response = await addOffer(context.token, {
      name,
      type,
      description,
      limit,
      price,
      card_id,
      status,
      image
    });
  }

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={{ height: '100%' }}>
        { image && (
          <Image source={{ uri: image.uri }} style={{ aspectRatio: '1/1' }} />
        )}
        <Button
          title="Upload photo"
          onPress={onPressUploadPhoto}
        />

        <TextInput 
          placeholder="Offer name"
          onChangeText={setName}
        />

        <TextInput 
          placeholder="Offer type"
          onChangeText={setType}
        />

        <TextInput 
          placeholder="Offer description"
          onChangeText={setDescription}
          multiline={true}
          numberOfLines={4}
        />

        <TextInput 
          placeholder="Offer limit"
          onChangeText={setLimit}
        />

        <TextInput
          placeholder="Offer price"
          onChangeText={value => setPrice(parseFloat(value))}
          inputMode="decimal"
        />

        <TextInput
          placeholder="Card id"
          onChangeText={value => setCardId(parseInt(value))}
          inputMode="numeric"
        />

        <Button
          title="Dodaj"
          onPress={onPressAddOffer}
        />
      </View>
    </ScrollView>
  );
}

export default AddOfferScreen;