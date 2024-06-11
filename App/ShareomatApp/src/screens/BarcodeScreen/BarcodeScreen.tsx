import React from "react"
import { Alert, Button, SafeAreaView, StatusBar, Text, TextInput, View, useColorScheme, useWindowDimensions } from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { styles } from "./Styles"
import { Barcode } from "@reeq/react-native-pdf417"
import { BarcodePropsType } from "../../types/BarcodePropsType"

function BarcodeScreen({ route, navigation }: BarcodePropsType): React.JSX.Element {

  const cardId = route.params.id
  const isDarkMode = useColorScheme() === 'dark'
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  }
  const { width: windowWidth } = useWindowDimensions()

  const code = cardId //"9900014107393"

  return (
    <View style={backgroundStyle}>

      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <Barcode
        text={"1," + code + ","}
        style={{
          height: windowWidth * 0.9 / 2.7,
          width: windowWidth * 0.9,
          justifyContent: "center",
          alignSelf: "center",
        }}
      />

      <Text style={styles.codeText}>{code}</Text>

    </View>
  )
}

export default BarcodeScreen
