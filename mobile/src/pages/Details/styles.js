import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20
    },

    header: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center'
    },
    
    incident: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#fff',
        marginTop: 48,
        marginBottom: 16
    },

    incidentProperty: {
        fontSize: 14,
        color: '#41414d',
        fontWeight: '700',
        //marginTop: 24
    },

    incidentValue: {
        marginTop: 8,
        fontSize: 15,
        marginBottom: 24,
        color: '#737380'
    },

    contactBox: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#fff',        
        marginBottom: 16
    },

    beTheHero: {
        fontWeight: '700',
        fontSize: 20,
        color: '#13131a'
    },

    actions: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    btn: {
        backgroundColor: '#e02041',
        borderRadius: 8,
        height: 50,
        width: '48%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    btnText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '700'
    }
})