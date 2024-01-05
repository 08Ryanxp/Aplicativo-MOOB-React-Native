import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#c5ddff',
    },
    title: {
        fontSize: 23,
        fontFamily: 'Inter_700Bold',
        color: '#011532',
        paddingTop: "62%"
    },
    subTitle: {
        textAlign: 'center',
        paddingTop: "4%",
        paddingStart: "4%",
        paddingEnd: "4%",
        fontSize: 17,
        color: "#000000",
        fontFamily: 'Inter_400Regular',
    },
    textLoc: {
        fontSize: 16,
        paddingTop: "4%",
        paddingBottom: "4%",
        fontFamily: 'Inter_600SemiBold',
        color: '#011532'
    },
    textDesc: {
        textAlign: 'center',
        fontSize: 17,
        color: "#000000",
        fontFamily: 'Inter_400Regular',        
        paddingStart: "2.5%",
        paddingEnd: "2.5%",
    },
    finalText: {
        fontSize: 18,
        color: "#2D68FF",
        fontFamily: 'Inter_600SemiBold',
        marginTop: "13%",
        marginBottom: "13%",
    },
    containerButton:{
        width: "100%",
        paddingStart: "4%",
        paddingEnd: "4%",
    },
    buttonLoc: {
        backgroundColor: "#FBA708",
        borderRadius: 50,
        padding: 13,
    },
    buttonText: {
        textAlign: 'center',
        color: "#000000",
        fontFamily: 'Inter_600SemiBold',
        fontSize: 16
    },


    
});

export default styles;