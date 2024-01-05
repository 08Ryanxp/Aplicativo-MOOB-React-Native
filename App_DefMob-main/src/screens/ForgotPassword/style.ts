import { StyleSheet, Dimensions} from "react-native";
const Width = Dimensions.get("window").width;
const Height = Dimensions.get("window").height;

const styles= StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#fff",
        width: Width,
        height: Height
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
        marginBottom: "12%",
        paddingStart: "6%",
        paddingEnd: "6%"
    },
    title: {
        color: "#000",
        fontSize: 31,
        marginBottom: "6%",
        fontFamily: "Inter_800ExtraBold"
    },
    subTitle: {
        fontFamily: "Inter_800ExtraBold",
        color: "#2D68FF",
        fontSize: 24,
        marginBottom: '1%'
    },
    description: {
        fontFamily: "Inter_500Medium",
        color: "#00000095",
        fontSize: 16
    },
    form: {
        flex: 1,
        paddingStart: "4%",
        paddingEnd: "4%"
    },
    inputIcon: {
        flexDirection: "row",
        alignItems: "center"
    },
    input: {
        backgroundColor: "#F3F8FF",
        borderRadius: 50,
        marginBottom: "6%",
        paddingVertical: 13,
        padding: 20,
        fontFamily: "Inter_400Regular"
    },
    continueButton: {
        backgroundColor: "#2D68FF",
        width: "100%",
        borderRadius: 50,
        padding: 13,
    },
    textButton: {
        textAlign: 'center',
        color: "#fff",
        fontFamily: 'Inter_700Bold',
        fontSize: 16
    },
});

export default styles;
