import React from "react"
import { Alert, Button, SafeAreaView, StatusBar, TextInput, useColorScheme } from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { styles } from "./Styles"

function RegisterScreen(): React.JSX.Element {

  ////const ip = '172.27.112.1'
  const ip = "192.168.1.102"
  const port = '3000'

  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  const [login, onChangeLogin] = React.useState('')
  const [password, onChangePassword] = React.useState('')
  const [repassword, onChangeRepassword] = React.useState('')

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      login: login,
      password: password
    })
  }

  const onPressRegister = async () => {
    if (password !== repassword) {
      Alert.alert("Podane hasła nie są takie same.")
    } else {
      try {
        await fetch(
          `http://${ip}:${port}/user/addUser`, requestOptions)
          .then(response => {
            response.json()
              .then(data => {
                Alert.alert(data.data)
              })
          })
      } catch (e: any) {
        console.error(e)
      }
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