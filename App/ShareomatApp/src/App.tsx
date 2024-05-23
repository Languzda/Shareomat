import React from 'react';
import LogInScreen from './screens/LogInScreen/LogInScreen';
import AppScreen from './screens/AppScreen/AppScreen';
import AuthContextProvider from './store/AuthContextProvider.tsx';

function App(): React.JSX.Element {
  const loggedIn = true;

  if (loggedIn) {
    return (
      <AuthContextProvider>
        <AppScreen />
      </AuthContextProvider>
    );
  } else {
    return (
      <AuthContextProvider>
        <LogInScreen />
      </AuthContextProvider>
    );
  }
}

export default App;
