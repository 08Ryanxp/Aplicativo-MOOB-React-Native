
import { StyleSheet, Dimensions } from "react-native";
const Width = Dimensions.get("window").width;
const Height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C5DDFF",
    width: Width,
    height: Height,
  },
  backButton: {
    paddingTop: "6%",
    paddingStart: "4.6%",
    flexDirection: "row",
    alignItems: "center",
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  logo: {
    flexDirection: "row",
    paddingTop: "2%",
    alignItems: "center",
    justifyContent: "center",
  },
  textIcon: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: "#000",
    marginLeft: "0.5%",
  },
  containerHeader: {
    marginTop: "6%",
    marginBottom: "8%",
    paddingStart: "6%",
    paddingEnd: "6%",
  },
  containerTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "#000",
    fontSize: 27,
    marginBottom: "1%",
    fontFamily: "Inter_800ExtraBold",
  },
  spanTitle: {
    color: "#2D68FF",
    fontSize: 27,
    marginBottom: "1%",
    fontFamily: "Inter_800ExtraBold",
  },
  subTitle: {
    fontFamily: "Inter_500Medium",
    color: "#00000095",
    fontSize: 17,
  },
  form: {
    flex: 1,
    paddingStart: "4%",
    paddingEnd: "4%",
  },
  inputIcon: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  input: {
    backgroundColor: "#E2EEFF",
    borderRadius: 50,
    marginBottom: "3%",
    paddingVertical: 13,
    padding: 20,
    fontFamily: "Inter_400Regular",
  },
  textLabel: {
    color: "#00000060",
  },
  ContainerCheckbox: {
    paddingStart: "4%",
    flexDirection: "row",
    alignItems: "center",
  },
  registerButton: {
    backgroundColor: "#FBA708",
    width: "100%",
    borderRadius: 50,
    padding: 13,
    marginTop: "5%",
    marginBottom: "8%",
  },
  buttonText: {
    textAlign: "center",
    color: "#000000",
    fontFamily: "Inter_700Bold",
    fontSize: 16,
  },
  portal: {
    flex: 1,
  },
  dialog: {
    backgroundColor: "#C5DDFF"
  },
  formatDropdown: {
    backgroundColor: "#E2EEFF",
    borderRadius: 50,
    padding: 7,
    paddingVertical: 0,
    marginBottom: "3%",
  },
});

export default styles;
