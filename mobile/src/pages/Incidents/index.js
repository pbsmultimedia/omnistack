import React, {useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, FlatList, Image, TouchableOpacity, Alert } from 'react-native'; // TouchableOpacity because button already has styles..
import logo from '../../assets/logo.png'; // should be SVG..
import {Feather} from '@expo/vector-icons';
import styles from './styles';
import api from '../../services/api';

export default function Incidents () {

    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState([]);
    const [page, setPage] =  useState(1); // infinite scroll
    const [loading, setLoading] =  useState(false); 

    const navigation = useNavigation();

    function navigateToDetail (incident) {
        navigation.navigate('Details', { incident });
    }

    async function loadIncidents () {        
                        
        if (loading) {
            return; // display a loader?
        }
        
        // all loaded?                        
        if (total > 0 && incidents.length == total) {            
            Alert.alert(
                'Incidents',
                'You have reached the end of the list',
                [                
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            )
            return;
        }        

        setLoading(true);

        const response = await api.get('incidents', {
            params: { page }
        });
        
        setIncidents([...incidents, ...response.data]); // add the new one        
        setTotal(response.headers['x-total-count']); // should only happen once.. on a pure component use componentDidMount
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(()=>{
        loadIncidents()
    }, []) // do something when the provided vars change

    return (
        <View style={styles.container}>
            {/* header should be a component */}
            <View style={styles.header}>
                <Image source={logo} />
                <Text style={styles.headerText}>
                    Showing {(page - 1) * 2} incidents of <Text style={styles.bold}> {total} </Text>
                </Text>
            </View>

            <Text style={styles.title}>
                Welcome
            </Text>

            <Text style={styles.description}>
                See the incidents
            </Text>

            {/* incidents list - incident should be a component.. */}
            <FlatList 
                style={styles.incidentsList}
                keyExtractor={incident => String(incident.id)}
                data={incidents}
                onEndReached={loadIncidents}
                onEndReachedThreshold={.1}
                renderItem={({ item: incident })=>(                                
                    <View style={styles.incident} >
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

                        <TouchableOpacity
                            style={styles.btn}
                            onPress={()=>navigateToDetail(incident)}
                        >
                            <Text style={styles.btnText}>See details</Text>
                            <Feather name="arrow-right" size={16} color="#e02041" />
                        </TouchableOpacity>
                    </View>                    
                )}
            />            
        </View>
    )
}