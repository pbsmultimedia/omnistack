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

    headerText: {
        fontSize: 15,
        color: '#737380',
    },

    bold: {
        fontWeight: "700"
    },

    title: {
        fontSize: 30,        
        marginTop: 25,
        marginBottom: 5,
        color: '#13131a',
        fontWeight: '700'
    },

    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#737380'
    },

    incidentsList: {
        marginTop: 32
    },

    incident: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#fff',
        marginBottom: 16
    },

    incidentProperty: {
        fontSize: 14,
        color: '#41414d',
        fontWeight: '700'
    },

    incidentValue: {
        marginTop: 8,
        //marginBottom: 10,
        fontSize: 15,
        marginBottom: 24,
        color: '#737380'
    },

    btn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    btnText: {
        color: '#e02041',
        fontSize: 15,
        fontWeight: '700'
    }
})