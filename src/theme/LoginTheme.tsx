import { StyleSheet } from "react-native";

const loginStyles = StyleSheet.create({
  formContainer:{
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    height: 600,
    marginBottom: 70
  },
  title:{
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20
  },
  label:{
    color: 'white',
    marginTop: 25,
    fontWeight: 'bold'
  },
  inputField:{
    color: 'white',
    fontSize: 20,
  },
  btnContainerLogin:{
    alignItems: 'center',
    marginTop: 50,
  },
  btn:{
    borderWidth: 2,
    borderColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 100
  },
  textBtn:{
    fontSize: 14,
    color: 'white'
  },
  newUserContainer:{
    alignItems: 'flex-end',
    marginTop: 20,
  },
  btnTop:{
    position: 'absolute',
    top: 10,
    left: 20,
    borderWidth: 1,
    borderColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100
  },
});

export default loginStyles;
