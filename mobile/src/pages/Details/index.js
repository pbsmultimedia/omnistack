import React from 'react';
import { Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import logo from '../../assets/logo.png'; // should be SVG.. and transversal
import * as MailComposer from 'expo-mail-composer';

import styles from './styles';

export default function Details () {

    const navigation = useNavigation();
    const route = useRoute(); // get params from url / navigation
    const incident = route.params.incident; // receive the incident object - no need to use the API
    const msg = `Hello ${ incident.name }, I am getting in touch to help you with the incident ${ incident.title }`;

    function navigateBack () {
        navigation.goBack();
    }

    function sendWhatsApp () { // app deep linking - how to handle if client does not have the app?
        Linking.openURL(`whatsapp://send?phone=${ incident.whatsapp }&text=${ msg }`)
    }

    function sendMail () {
        MailComposer.composeAsync({
            subject: `I want to be the hero on ${ incident.title }`,
            recipients: [incident.email],
            body: msg
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logo} />
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#e02041" />
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={styles.incidentProperty}>
                    ONG
                </Text>
                <Text style={styles.incidentValue}>
                    {incident.name}
                </Text>
                <Text style={styles.incidentProperty}>
                    incident
                </Text>
                <Text style={styles.incidentValue}>
                    {incident.title}
                </Text>
                <Text style={styles.incidentProperty}>
                    value
                </Text>
                <Text style={styles.incidentValue}>
                    {Intl.NumberFormat('en-EN', 
                        {
                            style: 'currency', 
                            currency: 'EUR'
                        }
                    ).format(incident.value)}
                </Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.beTheHero}>
                    Be the Hero!
                </Text>

                <Text style={styles.beTheHero}>
                    Get in touch to help.
                </Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.btn} onPress={sendWhatsApp}>
                        <Text style={styles.btnText}>
                            Whatsapp
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={sendMail}>
                        <Text style={styles.btnText}>
                            Email
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>

        </View>
    )
}