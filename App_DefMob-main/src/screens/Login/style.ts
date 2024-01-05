import { StyleSheet, Dimensions } from 'react-native';
const Width = Dimensions.get("window").width;
const Height = Dimensions.get("window").height;

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: "#fff",
        width: Width,
        height: Height
    },
    containerHeader: {
        marginTop: "15%",
        marginBottom: "10%",
        paddingEnd: "6%"
    },
    logo: {
        marginBottom: "7.5%"
    },
    title: {
        color: "#000",
        fontSize: 31,
        marginBottom: "1%",
        paddingStart: "6%",
        paddingEnd: "6%",
        fontFamily: "Inter_800ExtraBold"
    },
    subTitle: {
        fontFamily: "Inter_500Medium",
        color: "#00000095",
        paddingStart: "6%",
        paddingEnd: "6%",
        fontSize: 17
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
        backgroundColor: "#E2EEFF",
        borderRadius: 50,
        marginBottom: "3%",
        paddingVertical: 13,
        padding: 20,
        fontFamily: "Inter_400Regular"
    },
    forgotPassword: {
        color: "#000",
        marginTop: "2%",
        marginBottom: "4%",
        fontFamily: "Inter_500Medium",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "right",
        fontSize: 15,
    },
    loginButton: {
        backgroundColor: "#2D68FF",
        width: "100%",
        borderRadius: 50,
        padding: 13,
        marginBottom: "3%",
        marginTop: "4%"
    },
    registerButton: {
        backgroundColor: "#FBA708",
        width: "100%",
        borderRadius: 50,
        padding: 13,
        marginBottom: "9%"
    },
    buttonText: {
        textAlign: 'center',
        color: "#000000",
        fontFamily: 'Inter_700Bold',
        fontSize: 16
    },
    buttonTextLog: {
        textAlign: 'center',
        color: "#fff",
        fontFamily: 'Inter_700Bold',
        fontSize: 16
    },
    orContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    line: {
        height: 1,
        backgroundColor: "#00000050",
        flex: 1
    },
    orText: {
        color: "#00000080",
        marginLeft: "4%",
        marginRight: "4%",
        fontSize: 15,
        fontFamily: "Inter_400Regular"
    },
    loginGoogle: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-evenly",
        backgroundColor: "#000",
        width: "100%",
        borderRadius: 50,
        padding: 13,
        marginTop: "9%"
    },
    textLoginGoogle: {
        fontFamily: "Inter_700Bold",
        textAlign: 'center',
        color: "#fff",
        fontSize: 16
    }
})

export default styles;
