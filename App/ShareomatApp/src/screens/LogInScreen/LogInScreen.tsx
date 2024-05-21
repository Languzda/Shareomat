import React from "react"
import { Alert, Button, SafeAreaView, StatusBar, TextInput, useColorScheme } from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { styles } from "./Styles"

function LogInScreen(): React.JSX.Element {

  const ip = process.env.IP;
  const port = process.env.PORT;

  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  const [login, onChangeLogin] = React.useState('')
  const [password, onChangePassword] = React.useState('')

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      login: login,
      password: password
    })
  }

  const onPressLogIn = async () => {
    try {
      await fetch(
        `http://${ip}:${port}/user/logIn`, requestOptions)
        .then(response => {
          response.json()
            .then(data => {
              Alert.alert(data.message)
            })
        })
    }
    catch (e: any) {
      console.error(e)
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

      <Button
        onPress={onPressLogIn}
        title="zaloguj"
      />

    </SafeAreaView>
  )
}

export default LogInScreen