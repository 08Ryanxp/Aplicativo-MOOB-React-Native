import { StyleSheet, Dimensions } from "react-native";
const Width = Dimensions.get("window").width;
const Height = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  containerMap: {
    flex: 1,
    width: Width,
    height: Height,

  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: Width,
    height: Height
  },
  searchContainer: {
    flex: 1,
    position: 'absolute',
    top: "8%",
    left: 20,
    right: 20,
  },
  logoutButton: {
    position: 'absolute',
    top: 100,
    left: 155,
    right: 155,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
    backgroundColor: 'green',
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
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "bold",
    color: 'white',
    textAlign: 'left',
    padding: "0.01%",
  },
  //CurrentLocation
  marker2: {
    width: 55,
    height: 55,
    resizeMode: "contain",
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerModalBg: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: "3.8%",

  },
  iconFechar: {
    width: 25,
    height: 25
  },
  modalMarkerDel: {
    borderRadius: 20,
    backgroundColor: 'white',
    padding: "8%",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitulo: {
    color: "#FBA708",
    fontFamily: "Inter_700Bold",
    fontSize: 18.5
  },
  modalSubtitulo: {
    paddingBottom: "15%",
    color: '#fff',
    fontFamily: 'Inter_400Regular',
    fontSize: 15

  },
  textTitle: {
    marginBottom: "5%",
    textAlign: 'center',
    fontFamily: "Inter_500Medium",
    fontSize: 17
  },
  modalButton: {
    padding: 13,
    width: "40%",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50
  },
  delButton: {
    backgroundColor: "#FF2424",
  },
  textBtnDel: {
    color: "#fff",
    fontFamily: "Inter_600SemiBold",
    fontSize: 15.5
  },
  cancelButton: {
    backgroundColor: "#ECECEC"
  },
  textBtnCancel: {
    color: "#000",
    fontFamily: "Inter_600SemiBold",
    fontSize: 15.5
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center',
    paddingTop: "4%"
  },
  buttonIcon: {
    borderRadius: 50,
    margin: "5.4%",
    backgroundColor: "#ECECEC",
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonMarker: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconeStyle: {
    width: 40,
    height: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: "4%",
  },
  textContainerModal: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonAlert: {
    backgroundColor: "#fff",
    width: 52,
    height: 52,
    position: "absolute",
    borderRadius: 100,
    top: "73%",
    left: "83%",
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

  buttonCenter: {
    backgroundColor: "#fff",
    width: 52,
    height: 52,
    position: "absolute",
    borderRadius: 100,
    top: "82%",
    left: "83%",
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
  buttonCancel: {
    backgroundColor: "#fff",
    width: 52,
    height: 52,
    position: "absolute",
    borderRadius: 100,
    top: "91%",
    left: "83%",
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
  buttonInfo: {
    backgroundColor: "#00BFFF",
    width: 52,
    height: 52,
    position: "absolute",
    borderRadius: 100,
    alignItems: "center",
    borderColor: "white",
    borderWidth: 3,

    justifyContent: "center",
    top: "91%",
    left: "3%",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonTeste: {
    backgroundColor: "#fff",
    width: 52,
    height: 52,
    position: "absolute",
    borderRadius: 100,
    top: "61%",
    left: "80%",
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
  iconButtons: {
    height: 47,
    width: 47
  },
  buttonRoute: {
    backgroundColor: "#2D68FF",
    width: "100%",
    borderRadius: 50,
    paddingVertical: 10,
    marginBottom: "3%",
    marginTop: "4%"
  },
  textButtonRoute: {
    textAlign: 'center',
    color: "#fff",
    fontFamily: 'Inter_700Bold',
    fontSize: 16
  },
  input: {
    width: "100%",
    fontFamily: "Inter_400Regular",
    backgroundColor: "#FFF",
    borderRadius: 50,
    marginBottom: "1.5%",
    paddingVertical: 7,
    paddingHorizontal: 10,
    fontSize: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "4%",
},
line: {
    height: 1,
    backgroundColor: "#C3C3C3",
    flex: 1,
},
  iconBtnAudio:{
    height: 23,
    width: 23,
  },
  buttonAudio:{
    backgroundColor: "#fff",
    width: 50,
    height: 50,
    position: "absolute",
    borderRadius: 100,
    top: "64%",
    left: "83%",
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
  }

});
