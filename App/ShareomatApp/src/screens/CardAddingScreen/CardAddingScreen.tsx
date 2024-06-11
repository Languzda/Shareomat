import React, { useContext } from "react"
import { Alert, Button, SafeAreaView, StatusBar, TextInput, useColorScheme } from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { styles } from "./Styles"
import { addCard } from "../../controllers/CardController";
import { AuthContext } from "../../store/authContext";

function CardAddingScreen(): React.JSX.Element {
  const context = useContext(AuthContext);
  const isDarkMode = useColorScheme() === 'dark'
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1
  }

  const [cardId, onChangeCardId] = React.useState('')

  const onPressAddCard = async () => {
    //addCard(cardId, context.token) // , userId
    addCard(cardId, context.userId, context.token)
  }

  return (
    <SafeAreaView style={backgroundStyle}>

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
