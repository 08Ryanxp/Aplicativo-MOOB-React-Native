import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    containerProfile: {
        paddingTop: "14%",
        paddingBottom: "12%",
        paddingStart: "6%",
        paddingEnd: "6%",
        
    },
    containerPhoto: {
        marginTop: "8%",
        flexDirection: "row",
        alignItems: 'center'
    },
    photoProfile: {
        justifyContent: "center",
        alignItems: "center",
        width: 105,
        height: 105,
        backgroundColor: "#011532",
        borderRadius: 100
    },
    imageProfile: {
        width: "100%",
        height: "100%",
        borderRadius: 100
    },
    textProfile: {
        marginStart: "4%" 
    },
    email: {
        fontSize: 14,
        marginBottom: "1.2%",
        fontFamily: "Inter_600SemiBold",
        color: "#FBA708"
    },
    nameUser: {
        color: "#fff",
        fontSize: 18,
        fontFamily: "Inter_700Bold",
    },
    containerConfig: {
        marginTop: "20%"
    },
    buttonsConfig: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 14.5,
        paddingStart: "6%",
        paddingEnd: "6%",
    },
    buttonSwitch:{
        flexDirection: "row",
        alignItems: "center",
        paddingStart: "6%",
        paddingEnd: "4%",
        paddingVertical: "1%",
        justifyContent: "space-between",
    },
    textButtons: {
        color: "#737373",
        fontFamily: "Inter_400Regular",
        fontSize: 16
    },
    iconNext: {
        width: 22,
        height: 22,
    },
    lineContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    line: {
        height: 1,
        backgroundColor: "#00000035",
        flex: 1,
    },
    containerButton:{
        width: "100%",
        paddingStart: "4%",
        paddingEnd: "4%",
        marginTop: "10%",
    },
    buttonSignOut: {
        backgroundColor: "#FBA708",
        borderRadius: 50,
        padding: 13,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textSignOut: {
        textAlign: 'center',
        color: "#000",
        fontFamily: 'Inter_600SemiBold',
        fontSize: 16
    },
    inputIcon: {
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
    },

});

export default styles;