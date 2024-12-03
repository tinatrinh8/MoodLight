import { StyleSheet } from "react-native";

const SignUpScreenStyles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  screenContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 25,
  },
  title: {
    fontFamily: "Gentium BoldItalic",
    fontSize: 40,
    color: "rgba(255, 255, 255, 1)",
    fontWeight: "700",
  },
  subtitle: {
    marginTop: 15,
    fontFamily: "Gilda Display",
    fontSize: 12,
    color: "rgb(156, 31, 17)",
    fontWeight: "400",
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    marginBottom: 10,
  },
  input: {
    borderRadius: 20,
    minHeight: 60,
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    color: "rgb(224, 188, 114)",
    borderWidth: 1.5,
    marginBottom: 20,
    borderColor: "rgb(156, 31, 17)",
    fontFamily: "rivrdle",
  },
  signUpButton: {
    width: 140,
    borderRadius: 40,
    borderColor: "rgb(245, 205, 125)",
    borderWidth: 1.5,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignSelf: "center",
    backgroundColor: "transparent",
  },
  signUpButtonText: {
    fontFamily: "Gentium Basic",
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
    color: "rgb(245, 205, 125)",
    textAlign: "center",
  },
  footerContainer: {
    position: "absolute", // Position the footer at the bottom
    bottom: 50, // Add space between the footer and the bottom of the screen
    width: "100%", // Ensure the footer spans the width
    flexDirection: "row", // Align the account text and sign-up link
    justifyContent: "center", // Center items horizontally
    alignItems: "center", // Center items vertically
  },
  footerText: {
    fontFamily: "Gentium Basic",
    fontSize: 14,
    color: "rgba(255, 255, 255, 1)",
    fontWeight: "400",
    marginRight: 10,
  },
  loginLink: {
    transform: "skewX(-20deg)",
    fontFamily: "Gentium Basic",
    fontSize: 13,
    color: "rgb(156, 31, 17)",
    fontWeight: "700",
  },
});

export default SignUpScreenStyles;
