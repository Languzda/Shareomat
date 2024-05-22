import { Alert } from "react-native";

const ip = process.env.IP;
const port = process.env.PORT;

export async function logIn(login: string, password: string) {

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      login: login,
      password: password
    })
  }

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

export async function register(login: string, password: string) {

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      login: login,
      password: password
    })
  }

  try {
    await fetch(
      `http://${ip}:${port}/user/addUser`, requestOptions)
      .then(response => {
        response.json()
          .then(data => {
            if (data.errors === undefined) {
              Alert.alert(data.message)
            } else {
              Alert.alert(data.errors[0].msg)
            }
          })
      })
  } catch (e: any) {
    console.error(e)
  }
}
