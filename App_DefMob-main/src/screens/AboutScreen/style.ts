import { Dimensions, StyleSheet } from "react-native";
const Width = Dimensions.get("window").width;
const Height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Width,
    height: Height,
    backgroundColor: "#fff",
  },
  backButtonContainer: {
    paddingTop: "6%",
    paddingStart: "4.6%",
    flexDirection: "row",
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 16,
    color: "#000",
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  logo: {
    alignSelf: 'center'
  },
  title: {
    textAlign: "center",
    fontFamily: 'Inter_700Bold',
    fontSize: 25,
    color: "#011532",
    marginBottom: "2%",
  },
  containerText: {
    alignItems: "center",
    justifyContent: 'center'
  },
  box: {
    paddingHorizontal: "4%",
    marginTop: "5.8%"

  },
  boxList: {
    marginTop: "5.8%",
    marginBottom: '1%'

  },
  descriptionTitle: {
    textAlign: "center",
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: "#011532",
    marginTop: "3%",
    marginBottom: "3.5%",
  },
  description: {
    textAlign: "center",
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: "#6B7A8F",
  },

  version: {
    textAlign: "center",
    fontSize: 14,
    color: "#6B7A8F",
    fontFamily: 'Inter_400Regular',
    marginTop: '2%',
    marginBottom: '1.5%'
  },
  smallTeamMemberImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  teamMemberImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    alignSelf: "center",
    margin: 10,
  },
  teamMemberName: {
    fontFamily: 'Inter_400Regular',
  },
  memberContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  teamSection: {
    marginTop: 30,
    width: '100%',
    paddingHorizontal: 10,
  },
  listSection: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  accordion: {
    backgroundColor: "#FBA70815",
    borderBottomWidth: 1,
    borderColor: "#cacaca70",
    paddingVertical: 12,
  },
  accordionTitle: {
    color: "#333333",
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#cacaca70",
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  memberRole: {
    color: "#6B7A8F",
    fontFamily: "Inter_400Regular",
    fontSize: 14,
  },
});

export default styles;
