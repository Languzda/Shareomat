import React from "react"
import { Alert, Button, SafeAreaView, StatusBar, Text, TextInput, useColorScheme, useWindowDimensions } from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { styles } from "./Styles"
import { Barcode } from "@reeq/react-native-pdf417"

function BarcodeScreen(): React.JSX.Element {

  const isDarkMode = useColorScheme() === 'dark'
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }
  const { width: windowWidth } = useWindowDimensions()

  // pewnie otrzymywany ze strony ze szczegółami oferty, a nie z serwera
  const code = "9900014107393"

  return (
    <SafeAreaView style={backgroundStyle}>

      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <Barcode
        text={"1," + code + ","}
        style={{
          height: windowWidth * 0.9 / 2.7,
          width: windowWidth * 0.9,
          alignSelf: "center"
        }}
      />

      <Text style={styles.codeText}>{code}</Text>

    </SafeAreaView>
  )
}

export default BarcodeScreen