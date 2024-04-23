import React from 'react';
import type {PropsWithChildren} from 'react';
import {Text, View, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {styles} from '../Styles';

type OfferItemProps = PropsWithChildren<{
    name: string;
    type: string;
    description: string;
    limit: number;
    price: number;
    photo: string;
    card_id: number;
    status: string;
  }>;

export function OfferItem({children, name, type, description, limit, price, photo, card_id, status}: OfferItemProps): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    return (
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
    );
  }