import { StyleSheet, Dimensions } from "react-native";
const Width = Dimensions.get("window").width;
const Height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: Width,
    height: Height,
  },
  input: {
    width: "100%",
    fontFamily: "Inter_400Regular",
    backgroundColor: "#FFF",
    borderRadius: 50,
    marginBottom: "5%",
    paddingVertical: 7,
    paddingHorizontal: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#999"
  },

  //style add rotas
  titleModalAdd: {
    color: "#2D68FF",
    marginBottom: "5%",
    fontFamily: "Inter_700Bold",
    marginLeft: '2%',
    fontSize: 20,
  },
  AddContainer: {
    flex: 1,
    position: "absolute",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    left: 20,
    right: 20,
  },
  buttonStyle: {
    marginTop: 15,
    backgroundColor: "#2D68FF",
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: 'center'
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
  },
  iconInsideInput: {
    position: 'absolute',
    right: 10,
    color: '#aaa', // Cor do ícone
  },

  //Style da const render item
  card: {
    backgroundColor: "white",
    margin: 10,
    padding: 5,
    borderRadius: 8,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: "black",
    shadowOffset: { height: 2, width: 0 },
    elevation: 5,
  },
  ripple: {
    borderRadius: 8,
  },
  title: {
    color: "#000",
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    maxWidth: "100%",
  },
  subtitle: {
    marginRight: 25,
    color: "#737373",
    fontFamily: "Inter_400Regular",
  },
  headerContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingStart: "4%",
    paddingEnd: "4%",
    marginTop: "8.5%",
  },
  imageBackground: {
    width: "100%",
    height: 210,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    
  },
  headerSubTitle: {
    color: "white",
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    marginTop: "1%",

  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#FBA708",
  },

  //quando esta sem rotas
  noRoutesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginBottom: 50,
  },
  noRoutesText: {
    marginTop: 10,
    fontSize: 18,
    color: "#808080",
    fontFamily: "Inter_700Bold",
  },
  noRoutesSubText: {
    marginTop: 5,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    fontFamily: "Inter_400Regular",
  },
});

export default styles;
