import {AppRegistry} from 'react-native';
//import App from './src/App';
import App from './src/screens/AppScreen/AppScreen';
//import App from './src/screens/OfferListScreen/OfferListScreen';
//import App from './src/screens/LogInScreen/LogInScreen';
//import App from './src/screens/RegisterScreen/RegisterScreen';
//import App from './src/screens/BarcodeScreen/BarcodeScreen';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
