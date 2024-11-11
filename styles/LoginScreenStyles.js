import { StyleSheet } from 'react-native';

const LoginScreenStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#282e45',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  welcomeText: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '700',
  },
  descriptionText: {
    marginTop: 15,
    fontSize: 12,
    color: 'rgba(255, 140, 171, 1)',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    marginBottom: 25,
  },
  input: {
    borderRadius: 20,
    minHeight: 60,
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: '#000000',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: 'rgba(60, 90, 127, 1)',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignSelf: 'center',
  },
  loginButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 17,
  },
  accountText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginRight: 10,
  },
  signUpText: {
    color: 'rgba(255, 140, 171, 1)',
    fontSize: 13,
    fontWeight: '700',
  },
});

export default LoginScreenStyles;
