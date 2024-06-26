import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const API_URL = "http://192.168.1.5:3000/";
const accessToken = JSON.parse(SecureStore.getItem("session"))?.token || null;

axios.defaults.baseURL = API_URL;

export async function postToAPI(url, data) {
  try {
    const res = await axios.post(url, data);

    return res.data;
  } catch (err) {
    console.log(err.message)
  }
}

export async function fetchFromAPI(url) {
  if (accessToken) {
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
  }
  try {
    const res = await axios.get(url);
  
    return res.data
  } catch (err) {
    console.log(err.message)
  }
}