import React from 'react';
import LogInScreen from './screens/LogInScreen/LogInScreen';
import AppScreen from './screens/AppScreen/AppScreen';

function App(): React.JSX.Element {
    const loggedIn = true;

    if (loggedIn) {
        return (<AppScreen />);
    }
    else {
        return (<LogInScreen />);
    }
}

export default App;