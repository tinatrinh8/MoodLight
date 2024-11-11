import { StyleSheet } from "react-native";

const SignUpScreenStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#282e45", // Solid background color
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
    fontSize: 36,
    color: "rgba(255, 255, 255, 1)",
    fontWeight: "700",
  },
  subtitle: {
    marginTop: 15,
    fontFamily: "Gilda Display",
    fontSize: 12,
    color: "rgba(243, 192, 24, 1)",
    fontWeight: "400",
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    marginBottom: 25,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderRadius: 20,
    minHeight: 60,
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "#000000",
    color: "#FFFFFF",
  },
  signUpButton: {
    backgroundColor: "rgba(60, 90, 127, 1)",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignItems: "center",
    marginBottom: 25,
  },
  signUpButtonText: {
    fontFamily: "Gentium Basic",
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 17,
  },
  footerText: {
    fontFamily: "Gentium Basic",
    fontSize: 14,
    color: "rgba(255, 255, 255, 1)",
    fontWeight: "400",
    marginRight: 10,
  },
  loginLink: {
    fontFamily: "Gentium Basic",
    fontSize: 13,
    color: "rgba(243, 192, 24, 1)",
    fontWeight: "700",
  },
});

export default SignUpScreenStyles;
