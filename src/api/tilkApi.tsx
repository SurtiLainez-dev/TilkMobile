import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const tilkApi = axios.create({baseURL: ''});

tilkApi.interceptors.request.use(
  async(config)=>{
    const token = await AsyncStorage.getItem('token');
    if (token){
      config.headers['Authorization'] = 'Bearer '+token;
    }
    return config;
  }
);
export default tilkApi;
