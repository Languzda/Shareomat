import React, { useContext } from "react"
import { Alert, Button, SafeAreaView, StatusBar, TextInput, useColorScheme } from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { styles } from "./Styles"
import { logIn } from "../../controllers/UserController";
import { AuthContext } from "../../store/authContext";
import { LogInPropsType } from "../../types/LogInPropsType";

function LogInScreen({route, navigation}: LogInPropsType): React.JSX.Element {
  const context = useContext(AuthContext);
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [login, onChangeLogin] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const onPressLogIn = async () => {
    logIn(login, password, context);
  }

  const onPressRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <TextInput
        style={styles.input}
        onChangeText={onChangeLogin}
        placeholder="login"
      />

      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        secureTextEntry={true}
        placeholder="hasło"
      />

      <Button
        onPress={onPressLogIn}
        title="zaloguj"
      />

      <Button
        onPress={onPressRegister}
        title="zarejestruj"
      />

    </SafeAreaView>
  )
}

export default LogInScreen;
