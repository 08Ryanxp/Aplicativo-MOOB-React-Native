import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  search: {
    flex: 1,
    position: "absolute",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    left: 20,
    right: 20,
  },
  logoutButton: {
    position: "absolute",
    top: 100,
    left: 155,
    right: 155,
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
    color: "black",
    backgroundColor: "green",
  },
  //MarkLocation
  marker: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    //backgroundColor: "yellow",
    //borderRadius: 30,
    //borderWidth: 2,
  },
  infoText: {
    fontSize: 15,
  },
  //CurrentLocation
  marker2: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonClose: {
    alignItems: "flex-end",
    marginBottom: 22,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    borderRadius: 50,
    elevation: 2,
    margin: 100,
    marginTop: 50,
  },
  buttonIcon: {
    backgroundColor: "#bdc3c7",
    padding: 15,
  },
  iconeStyle: {
    width: 40,
    height: 40,
  },
  modalText: {
    marginBottom: 35,
    textAlign: "center",
    fontFamily: "Inter_600SemiBold",
    fontSize: 17,
  },
  buttonAlert: {
    backgroundColor: "#fff",
    width: 70,
    height: 70,
    position: "absolute",
    borderRadius: 100,
    top: 690,
    right: 0,
    left: 330,
  },
  btn_modal: {
    position: "relative",
    top: 10,
    left: 10,
  },
  input: {
    width: "100%",
    fontFamily: "Inter_400Regular",
    backgroundColor: "#FFF",
    borderRadius: 50,
    paddingVertical: 7,
    paddingHorizontal: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#999",
  },
  buttonStyle: {
    marginTop: 15,
    backgroundColor: "#2D68FF",
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: "center"
  },
});
