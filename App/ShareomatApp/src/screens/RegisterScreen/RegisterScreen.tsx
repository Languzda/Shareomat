import React from "react"
import { Alert, Button, SafeAreaView, StatusBar, TextInput, useColorScheme } from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { styles } from "./Styles"
import { register } from "../../controllers/UserController";
import { RegisterPropsType } from "../../types/RegisterPropsType";

function RegisterScreen({route, navigation}: RegisterPropsType): React.JSX.Element {

  const isDarkMode = useColorScheme() === 'dark'
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  const [login, onChangeLogin] = React.useState('')
  const [password, onChangePassword] = React.useState('')
  const [repassword, onChangeRepassword] = React.useState('')

  const onPressRegister = async () => {
    if (password !== repassword) {
      Alert.alert("Podane hasła nie są takie same.")
    } else {
      register(login, password)
    }
  }

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

      <TextInput
        style={styles.input}
        onChangeText={onChangeRepassword}
        secureTextEntry={true}
        placeholder="powtórz hasło"
      />

      <Button
        onPress={onPressRegister}
        title="zarejestruj"
      />

    </SafeAreaView>
  )
}

export default RegisterScreen
