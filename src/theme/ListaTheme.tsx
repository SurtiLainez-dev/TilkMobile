import { StyleSheet } from "react-native";

const ListaTheme = StyleSheet.create({
  mainContainer:{
    flex: 1,
    backgroundColor:'#FDFEFE',
  },
  inputBusqueda:{
    backgroundColor:'white',
    marginTop: 5,
    height: 42,
    color:'#000',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,

    elevation: 10,
  },
  containerList:{
    backgroundColor: 'white',
    padding: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    marginVertical: 3,
    marginRight: 2
  },
  titleLista:{
    fontSize: 13,
    color: '#2C3E50',
    fontWeight: "bold"
  }
})

export default ListaTheme;
