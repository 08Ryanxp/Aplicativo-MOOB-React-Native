import { Dimensions, StyleSheet } from "react-native";
const Width = Dimensions.get("window").width;
const Height = Dimensions.get("window").height;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#C5DDFF",
    width: Width,
    height: Height,
  },
  iconBack: {
    width: 24,
    height: 24,
  },
  textIcon: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: '#000',
    marginLeft: "0.5%"
  },
  rowProfile: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingStart: "4.5%",
  },
  containerProfile: {
    marginTop: "5%",
    marginBottom: "6%",
  },
  buttonBack: {
    flexDirection: "row",
    alignItems: "center",
  },
  containerHeader: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  title: {
    color: "#000",
    fontSize: 25,
    fontFamily: "Inter_700Bold"
  },
  logo: {
    marginBottom: "7%",
  },
  containerBox: {
    paddingStart: "4%",
    paddingEnd: "4%",
  },
  mensagemBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFF',
    paddingVertical: 20,
    borderRadius: 20,
    minHeight: 150,
    padding: 20,
  },
  mensagemInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: "Inter_400Regular",

  },
  contadorCaracteres: {
    color: '#737373',
    fontSize: 13,
    marginRight: "3%",
    fontFamily: "Inter_500Medium",

  },
  inputIcon: {
    flexDirection: "row",
    alignItems: "center"
  },
  containerData: {
    paddingStart: "4%",
    paddingEnd: "4%",
    marginTop: "2%",
  },
  label: {
    fontSize: 16,
    color: "#000",
    fontFamily: "Inter_400Regular",
    marginTop: "3%",
    marginBottom: "2%"
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 50,
    marginBottom: "3%",
    paddingVertical: 13,
    fontSize: 15,
    padding: 20,
    fontFamily: "Inter_400Regular"
  },
  containerInfo: {
    paddingTop: "10%",
    paddingBottom: "10%",
  },
  textInfo1: {
    fontSize: 14.5,
    fontFamily: "Inter_400Regular",
    textAlign: 'center',
    marginBottom: "3%",
  },
  textInfo2: {
    fontSize: 15,
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
    color: '#000'
  },
  enviarBtn: {
    width: "100%",
    borderRadius: 50,
    padding: 13,
    backgroundColor: '#2D68FF'

  },
  enviarBtnText: {
    textAlign: 'center',
    color: "#fff",
    fontFamily: 'Inter_700Bold',
    fontSize: 16
  },



})

export default styles;