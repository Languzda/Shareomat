import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackParamListType } from "../../types/StackParamListType";
import OfferListScreen from "../OfferListScreen/OfferListScreen";
import OfferViewScreen from "../OfferViewScreen/OfferViewScreen";
import { ActiveOffersScreenPropsType } from "../../types/ActiveOffersScreenPropsType";
import AddOfferScreen from "../AddOfferScreen/AddOfferScreen";
import BarcodeScreen from "../BarcodeScreen/BarcodeScreen";

const Stack = createNativeStackNavigator<StackParamListType>();

function ActiveOffersScreen({navigation, route}: ActiveOffersScreenPropsType): React.JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen name="OfferList" component={OfferListScreen} options={{ title: "Lista ofert" }}/>
      <Stack.Screen name="OfferView" component={OfferViewScreen} options={{ title: "Oferta" }}/>
      <Stack.Screen name="AddOffer" component={AddOfferScreen} options={{ title: "Dodaj ofertę" }}/>

      <Stack.Screen name="Barcode" component={BarcodeScreen} options={{ title: "Użycie oferty" }}/>
    </Stack.Navigator>
  );
}

export default ActiveOffersScreen;