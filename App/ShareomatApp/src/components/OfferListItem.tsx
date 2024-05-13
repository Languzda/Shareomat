import React from 'react';
import type { PropsWithChildren } from 'react';
import { Text, TouchableNativeFeedback, View, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { styles } from '../Styles';
import { ListOfferType } from '../types/ListOfferType';

type OfferItemProps = PropsWithChildren<ListOfferType>;

export function OfferListItem({ children, id, name, description, price }: OfferItemProps): React.JSX.Element {
  function onPress() {

  }

  const isDarkMode = useColorScheme() === 'dark';
  return (
    <TouchableNativeFeedback style={styles.sectionContainer} onPress={onPress}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {name}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {description}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {price}
      </Text>
    </TouchableNativeFeedback>
  );
}