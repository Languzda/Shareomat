import React from 'react';
import LogInScreen from './screens/LogInScreen/LogInScreen';
import AppScreen from './screens/AppScreen/AppScreen';
import AuthContextProvider from './store/AuthContextProvider.tsx';

function App(): React.JSX.Element {
  const loggedIn = true;

  if (loggedIn) {
    return (
      //@ts-ignore
      <AuthContextProvider>
        <AppScreen />
      </AuthContextProvider>
    );
  } else {
    return (
      //@ts-ignore
      <AuthContextProvider>
        <LogInScreen />
      </AuthContextProvider>
    );
  }
}

export default App;
