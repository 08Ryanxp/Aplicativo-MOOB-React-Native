import { StyleSheet, Dimensions } from "react-native";

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
const { width } = Dimensions.get('window');


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: Width,
        height: Height
    },
    containerSearch: {
        paddingEnd: '4%',
        paddingStart: '4%',
        marginTop: "6%"
    },
    searchStyle: {
        backgroundColor: "#FEF1D9",
        marginBottom: "8%",
        fontFamily: "Inter_400Regular",

    },
    containerCategory: {
        paddingEnd: '5%',
        paddingStart: '5%',
    },
    titles: {
        fontFamily: "Inter_700Bold",
        fontSize: 17,
        marginBottom: "4%",
    },
    rowCategory: {
        flexDirection: 'row',
        alignItems: "center",
        marginBottom: '8%'
    },
    buttonCategory: {
        backgroundColor: "#FBA708",
        padding: 13.5,
        borderRadius: 20,
        marginRight: "4%"
    },
    iconButton: {
        width: 35,
        height: 35
    },
    containerTitleCarousel: {
        paddingEnd: '5%',
        paddingStart: '5%',
    },
    styleCardCarousel: {
        height: width / 1.8,
        width: width * 0.8 - 20,
        marginHorizontal: 10,
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        overflow: 'hidden'
    },
    contentCarousel: {
        margin: "3.5%",
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    btnRouteCarousel: {
        alignItems: 'flex-end'
    },
    iconRouteCarousel: {
        width: 40,
        height: 40,
    
    },
    titleCarousel: {
        color: "#FFF",
        fontSize: 17.5,
        fontFamily: "Inter_600SemiBold",
    },
    addressCarousel: {
        color: "#FFF",
        fontSize: 15,
        fontFamily: "Inter_400Regular",      
    },
    distanceCarousel: {
        color: "#fff",
        fontSize: 15.5,
        fontFamily: "Inter_600SemiBold",
    },
    containerCards: {
        paddingEnd: '5%',
        paddingStart: '5%',
        marginTop: "8%",
    },
    card: {
        backgroundColor: "#f4f4f4",
        borderRadius: 20,
        width: "100%",
        height: 130,
        flexDirection: 'row',
        marginBottom: "4%"
    },
    imageCard: {
        resizeMode: 'cover',
        width: 155,
        height: 130,
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20
    },
    TextCard: {
        width: "54%",
        marginLeft: "3%",
        justifyContent: 'space-around'
    },
    nameLocation: {
        fontSize: 14.5,
        fontFamily: "Inter_600SemiBold",
    },
    nameCategory: {
        marginBottom:8,
        marginTop:4,
        color: "#A6A6A6",
        fontFamily: "Inter_400Regular",
    },
    address: {
        fontSize: 12,
        color: "#737373",
        fontFamily: "Inter_400Regular",

    },
    textAndButton: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between'
    },
    distance: {
        color: "#A6A6A6",
        fontFamily: "Inter_600SemiBold",
    },
    iconRoute: {
        width: 34,
        height: 34
    }







});

export default styles;