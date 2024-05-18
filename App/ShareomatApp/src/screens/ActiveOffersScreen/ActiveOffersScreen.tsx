import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackParamListType } from "../../types/StackParamListType";
import OfferListScreen from "../OfferListScreen/OfferListScreen";
import OfferViewScreen from "../OfferViewScreen/OfferViewScreen";
import { ActiveOffersScreenPropsType } from "../../types/ActiveOffersScreenPropsType";

const Stack = createNativeStackNavigator<StackParamListType>();

function ActiveOffersScreen({navigation, route}: ActiveOffersScreenPropsType): React.JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen name="OfferList" component={OfferListScreen} />
      <Stack.Screen name="OfferView" component={OfferViewScreen} />
    </Stack.Navigator>
  );
}

export default ActiveOffersScreen;