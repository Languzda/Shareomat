import {Alert} from 'react-native';
import {authContextType} from '../store/authContext';

const ip = process.env.IP;
const port = process.env.PORT;

export async function logIn(
  login: string,
  password: string,
  context: authContextType,
) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      login: login,
      password: password,
    }),
  };

  try {
    console.log('login');
    const response = await fetch(
      `http://${ip}:${port}/user/logIn`,
      requestOptions,
    );
    const data = await response.json();

    if (data.message === undefined) {
      throw new Error('Message is undefined');
    }

    if (data.data !== undefined) {
      Alert.alert('', data.message);

      context.onLogin(data.data.token, data.data.userId);
    } else {
      Alert.alert('Error', data.message);
    }
  } catch (e: any) {
    console.error(e);
    //todo
  }
}

export async function register(login: string, password: string) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      login: login,
      password: password,
    }),
  };

  try {
    await fetch(`http://${ip}:${port}/user/addUser`, requestOptions).then(
      response => {
        response.json().then(data => {
          console.log(data);

          if (data.errors === undefined) {
            Alert.alert(data.message);
          } else {
            Alert.alert('Error', data.errors[0].context.errors[0].msg);
          }
        });
      },
    );
  } catch (e: any) {
    console.error(e);
  }
}
