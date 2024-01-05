import { StyleSheet, Dimensions } from "react-native";
const Width = Dimensions.get("window").width;
const Height = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#bdc3c710",
        width: Width,
        height: Height
    },
    containerProfile: {
        marginTop: "6%",
        marginBottom: "27%",
        paddingEnd: "6%"
    },
    rowProfile: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    buttonBack: {
        paddingStart: "4.6%",
        flexDirection: "row",
        alignItems: "center",
    },
    iconBack: {
        width: 24,
        height: 24
    },
    textIcon: {
        fontFamily: "Inter_400Regular",
        fontSize: 15,
        color: '#fff',
        marginLeft: "0.5%"
    },
    containerPhoto: {
        paddingTop: "7%",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "center"
    },
    photoProfile: {
        justifyContent: "center",
        alignItems: "center",
        width: 125,
        height: 125,
        backgroundColor: "#011532",
        borderRadius: 100,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    imageProfile: {
        width: 120,
        height: 120,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    addPhoto: {
        width: 38,
        height: 38,
        backgroundColor: "#fff",
        borderRadius: 50,
        position: "absolute",
        right: "30%",
        top: "92%",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    iconAdd: {
        width: 27,
        height: 27,
    },
    containerData: {
        paddingStart: "6%",
        paddingEnd: "6%",
        marginTop: "3%",
    },
    title: {
        fontSize: 24,
        fontFamily: "Inter_600SemiBold",
        textAlign: 'center',
        marginBottom: "8%"
    },
    titleAdd: {
        fontSize: 24,
        fontFamily: "Inter_600SemiBold",
        textAlign: 'center',
        marginBottom: "8%",
        marginTop: "3%",

    },
    label: {
        fontSize: 16,
        color: "#000",
        fontFamily: "Inter_500Medium"
    },
    input: {
        fontSize: 16,
        paddingVertical: 5,
        fontFamily: "Inter_400Regular"
    },
    orContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    line: {
        height: 1,
        backgroundColor: "#00000050",
        flex: 1,
        marginBottom: "5%",
    },
    textLabel: {
        color: "#66666695",
    },
    saveButton: {
        backgroundColor: "#FBA708",
        borderRadius: 50,
        padding: 13,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: "1%",
        marginBottom: "6%",
    },
    textSaveButton: {
        textAlign: 'center',
        color: "#000000",
        fontFamily: 'Inter_700Bold',
        fontSize: 16
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '85%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 15,
        elevation: 10,
    },
    textModal: {
        marginBottom: "6%",
        color: "#000",
        fontSize: 20,
        fontFamily: "Inter_600SemiBold",
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: "center"
    },
    close: {
        textAlign: 'right',
        color: "#FF2424",
        fontSize: 16,
        fontFamily: 'Inter_500Medium'
    },
    image: {
        borderRadius: 100,
        width: 150,
        height: 150,
    },


});

export default styles;