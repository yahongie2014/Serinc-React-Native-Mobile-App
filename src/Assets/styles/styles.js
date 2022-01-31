import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const MainAppScreenStyles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainAppCategoriesView: {
    flex: 1,
    backgroundColor: 'white',
  }
});

export const CommonStyles = StyleSheet.create({
  header: {
    marginTop: hp('5%'),
    backgroundColor: 'white',
    flex: 1
  },
  spinner: {
    marginTop: hp('35%'),
    alignSelf: "center"
  }
});
export const TommorHeaderStyles = StyleSheet.create({
  header: {
    backgroundColor: "white",
    marginTop: hp("3%"),
    alignContent: "center"
  },
  body: {
    alignContent: "center",
    justifyContent: "center",
    flex: 2,
    height: hp("100%"),
    alignSelf: "center",
    alignContent: "center"
  },
  logo: {
    width: 170,
    height: 40,
    marginLeft: wp("7%"),
    marginRight: wp("7%"),
    alignSelf: "center",
    marginLeft: "37%",
    marginTop: "2%"
  },
  left: {
    width: wp("20%"),
    marginTop: hp("1.5%")
  },
  right: {
    width: wp("30%"),
    marginTop: hp("1.5%")
  },
  button: { marginBottom: "15%" },
  secoundButton:{ marginBottom: "15%",width:"100%" }
});

export const MainAppCategoriesStyles = StyleSheet.create({
  mainView: { flexGrow: 1, paddingBottom: 60 }
});
export const MainCategoryStyle = StyleSheet.create({
  image: {
    height: "100%",
    width: "100%",
    opacity: 0.7
  },
  mainView: {
    flex: 1,
    height: 250,
    backgroundColor: "black",
    justifyContent: "center"
  },
  colorFullView: {
    zIndex: 1,
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignSelf: "center"
  },
  textTitle: {
    color: "white",
    fontSize: 35,
    fontWeight: "500",
    textAlign: "center",
    alignSelf: "center",
    fontFamily: "calibri",
    fontStyle: "italic"
  },
  textdescribtion: {
    fontWeight: "200",
    color: "white",
    fontSize: 15,
    textAlign: "center",
    alignSelf: "center",
    marginLeft: wp("10%"),
    marginRight: wp("10%")
  }
});
export const ProductsStyle = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "white"
  }
});
export const OrdinaryHeaderStyle = StyleSheet.create({
  header: {
    backgroundColor: "white",
    marginTop: hp("3%"),
    alignContent: "center"
  },
  body: {
    alignContent: "center",
    justifyContent: "center",
    flex: 2,
    height: hp("100%"),
    alignSelf: "center",
    alignContent: "center"
  },
  headerText: {
    marginLeft: wp("7%"),
    marginRight: wp("7%"),
    alignSelf: "center",
    textAlign: "center",
    marginLeft: "37%",
    marginTop: hp("0.5%"),
    color: "#9B3430"
  },
  left: {
    width: wp("20%"),
    marginTop: hp("1.5%")
  },
  right: {
    width: wp("30%"),
    marginTop: hp("1.5%")
  },
  button: { marginBottom: "15%" }
});
export const ScrollViewForCarrosel = {
  scrollContainer: {
    height: hp("35%"),
    width: "100%",
    position: "relative"
  },
  image: {
    width: wp("100%"),
    marginRight: 5
  }
};
export const ViewProductStyle = {
  mainView: {
    backgroundColor: "white"
  },
  mainCard: {
    width: wp("100%"),
    padding: 0
  },
  cardHeader: { flexDirection: "row", alignSelf: "flex-end" },
  headerText: { margin: 0, padding: 0, alignSelf: "center" },
  heartIcon: {
    color: "brown",
    fontSize: 25,
    margin: 0,
    padding: 0
  },
  CardItem: {
    margin: "1%",
    flexDirection: "column",
    padding: 0
  },
  Title: {
    alignSelf: "flex-start",
    padding: 0,
    fontSize: 25,
    fontWeight: "500",
    color: "black",
    marginBottom: "5%"
  },
  By: {
    alignSelf: "flex-start",
    padding: 0,
    fontSize: 20,
    fontWeight: "300",
    color: "black",
    marginBottom: "3%"
  },
  Manifacture: {
    alignSelf: "flex-start",
    padding: 0,
    fontSize: 20,
    fontWeight: "400",
    marginBottom: "3%"
  },
  Price: {
    alignSelf: "flex-start",
    padding: 0,
    fontSize: 20,
    fontWeight: "300",
    color: "black",
    marginBottom: "3%"
  },
  Description: {
    alignSelf: "flex-start",
    padding: 0,
    fontSize: 20,
    fontWeight: "400",
    color: "grey"
  },
  DescriptionText: {
    alignSelf: 'flex-start',
    padding: 0,
    fontSize: 15,
    fontWeight: '300',
    color: 'black',
    marginBottom: '3%',
  },
  Quantity: {
    alignSelf: 'flex-start',
    padding: 0,
    fontSize: 20,
    fontWeight: '500',
    marginBottom: '4%',
  },
};
export const defaultStyles = {
  text: {
    fontFamily: 'Avenir',
  },
};

export default MainAppScreenStyles;
