import React from 'react';
import type { PropsWithChildren } from 'react';
import { Text, TouchableNativeFeedback, View, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { styles } from './Styles';
import { ListOfferType } from '../../types/ListOfferType';

type OfferItemProps = PropsWithChildren<ListOfferType> & {onPress: (id: number) => void;};

export function OfferListItem({ children, id, name, description, price, onPress }: OfferItemProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <TouchableNativeFeedback onPress={() => onPress(id)}>
      <View style={styles.sectionContainer}>
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
      </View>
    </TouchableNativeFeedback>
  );
}