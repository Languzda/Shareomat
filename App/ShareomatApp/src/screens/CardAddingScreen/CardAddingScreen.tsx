import React from "react"
import { Alert, Button, SafeAreaView, StatusBar, TextInput, useColorScheme } from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { styles } from "./Styles"
import { addCard } from "../../controllers/CardController";

function CardAddingScreen(): React.JSX.Element {

  const isDarkMode = useColorScheme() === 'dark'
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  const [cardId, onChangeCardId] = React.useState('')

  const onPressAddCard = async () => {
    addCard(cardId) // , userId
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <TextInput
        keyboardType="numeric"
        style={styles.input}
        onChangeText={onChangeCardId}
        placeholder="numer karty"
      />

      <Button
        onPress={onPressAddCard}
        title="dodaj kartę"
      />

    </SafeAreaView>
  )
}

export default CardAddingScreen
