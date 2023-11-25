import { StyleSheet } from "react-native";

const menuStyles = StyleSheet.create({
  titulo:{
    fontSize: 30,
    color: '#566573',
    fontWeight: 'bold',
    marginLeft: 5
  },
  subtitulo:{
    fontSize: 16,
    color: '#566573',
    marginLeft: 20,
    marginBottom: 5
  },
  menuContainer:{
    marginVertical: 10,
    marginHorizontal: 20,
    alignItems: 'flex-start',
  },
  menuItemsBtn:{
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderLeftWidth: 5,
    borderLeftColor: '#0699FE'
  },
  menuItemsTexto:{
    fontSize: 20,
    color: '#566573',
    fontWeight: 'bold',
    marginLeft: 10
  }
})

export default menuStyles;
