import { StyleSheet, useColorScheme } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const isDarkMode = useColorScheme() === 'dark'

export var styles = StyleSheet.create({
  codeText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  backgroundStyle: {
    backgroundColor: Colors.darker, //isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})