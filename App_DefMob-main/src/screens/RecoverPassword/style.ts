import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    backButton: {
        paddingTop: "6%",
        paddingStart: "4.6%",
        flexDirection: 'row',
        alignItems: 'center',
    },
    backIcon: {
        width: 24,
        height: 24
    },
    textIcon: {
        fontFamily: "Inter_400Regular",
        fontSize: 15,
        color: '#000',
        marginLeft: "0.5%"
    },
    containerHeader: {
        marginTop: "12%",
        marginBottom: "7%",
        paddingStart: "6%",
        paddingEnd: "6%"
    },
    title: {
        color: "#000",
        fontSize: 31,
        marginBottom: '1%',
        fontFamily: "Inter_800ExtraBold"
    },
    subTitle: {
        fontFamily: "Inter_500Medium",
        color: "#00000095",
        fontSize: 16
    },
    form: {
        flex: 1,
        paddingStart: "4%",
        paddingEnd: "4%"
    },
    label: {
        fontSize: 16,
        padding: 12,
        color: "#000"
    },
    inputIcon: {
        flexDirection: "row",
        alignItems: "center"
    },
    input: {
        backgroundColor: "#E2EEFF",
        borderRadius: 50,
        marginBottom: "1.5%",
        fontSize: 16,
        paddingVertical: 13,
        padding: 20,
        fontFamily: "Inter_400Regular"
    },
    continueButton: {
        backgroundColor: "#2D68FF",
        width: "100%",
        borderRadius: 50,
        padding: 13,
        marginTop: '1.5%'
    },
    textButton: {
        textAlign: 'center',
        color: "#fff",
        fontFamily: 'Inter_700Bold',
        fontSize: 16
    },
});

export default styles;
