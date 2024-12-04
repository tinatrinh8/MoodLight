import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const LoginScreenStyles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // Ensures the image covers the entire screen
    width: "100%", // Full width
    height: "100%", // Full height
    justifyContent: "center", // Center content vertically
  },
  screenContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    position: "relative", // Ensure relative positioning
  },
  container: {
    flex: 1,
    backgroundColor: "#071c39",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  welcomeContainer: {
    alignItems: "center",
    marginBottom: 25,
  },
  welcomeText: {
    fontFamily: "Gentium BoldItalic",
    color: "#FFFFFF",
    fontSize: 45,
    fontWeight: "700",
  },
  descriptionText: {
    fontFamily: "Gilda Display",
    marginTop: 15,
    fontSize: 12,
    color: "rgb(0, 96, 161)",
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    marginBottom: 25,
  },
  input: {
    borderRadius: 20,
    minHeight: 60,
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    color: "rgb(214, 73, 60)", // Ensures text color is black
    borderWidth: 1.5,
    marginBottom: 20,
    borderColor: "rgb(0, 96, 161)",
    fontFamily: "rivrdle",
  },
  loginButton: {
    width: 140,
    borderRadius: 40,
    borderColor: "rgb(214, 73, 60)",
    borderWidth: 1.5,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignSelf: "center",
  },
  loginButtonText: {
    fontFamily: "Gentium Basic",
    fontSize: 18,
    color: "rgb(214, 73, 60)",
    fontWeight: "700",
    textAlign: "center", // Ensures text alignment within the button
  },
  footerContainer: {
    position: "absolute", // Position the footer at the bottom
    bottom: 50, // Add space between the footer and the bottom of the screen
    width: "100%", // Ensure the footer spans the width
    flexDirection: "row", // Align the account text and sign-up link
    justifyContent: "center", // Center items horizontally
    alignItems: "center", // Center items vertically
  },
  accountText: {
    fontFamily: "Gentium Basic",
    color: "#FFFFFF",
    fontSize: 14,
    marginRight: 10,
  },
  signUpText: {
    transform: "skewX(-20deg)",
    fontFamily: "Gentium Basic",
    color: "rgb(0, 96, 161)",
    fontSize: 13,
    fontWeight: "700",
  },
});

export default LoginScreenStyles;
