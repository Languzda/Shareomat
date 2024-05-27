import React from 'react';
import AuthContextProvider from './store/AuthContextProvider.tsx';
import HandleLogInScreen from './screens/HandleLogInScreen/HandleLogInScreen.tsx';

function App(): React.JSX.Element {
  return (
    <AuthContextProvider>
      <HandleLogInScreen />
    </AuthContextProvider>
  );
}

export default App;
