import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
} from 'react-native';

import { OfferViewPropsType } from '../../types/OfferViewPropsType';
import { OfferType } from '../../types/OfferType';
import { styles } from './Styles';

function OfferViewScreen({ route, navigation }: OfferViewPropsType): React.JSX.Element {
    const ip = '172.27.112.1';
    const port = '3001';

    const [offer, setOffer] = useState<OfferType>();

    useEffect(() => {
        async function getActiveOffers() {
            const response = await fetch(`http://${ip}:${port}/offer/getOfferById/${route.params.id}`);
            setOffer(await response.json());
        };

        if (!offer) {
            getActiveOffers();
        }
    });

    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>
                { offer ? offer.name : "chwila..." }
            </Text>
            <Text style={styles.sectionDescription}>
                { offer?.date_added }
            </Text>
        </View>
    )
}

export default OfferViewScreen;