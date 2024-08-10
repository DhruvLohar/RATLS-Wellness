import axios from "axios";
import * as SecureStore from 'expo-secure-store';

export const API_URL = "http://192.168.1.13:3000/";
// export const API_URL = "https://app.reachandteach.in/"

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
  try {
    const session = JSON.parse(SecureStore.getItem("session") || "{}");
    if (session?.accessToken) {
      axios.defaults.headers.common.Authorization = `Bearer ${session?.accessToken}`
    }
    const res = await axios.get(url);

    return res.data
  } catch (err) {
    console.log(err.message)
    return {success: false}
  }
}

export async function axiosRequest(url, req_params, sendingMedia) {
  const session = JSON.parse(SecureStore.getItem("session") || "{}");

  try {
    const res = await axios.request({
      url: API_URL + url,
      ...req_params,
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        Accept: "application/json",
        "Content-Type": sendingMedia
          ? "multipart/form-data"
          : "application/json",
      },
    });
    
    return res.data;
  } catch (err) {
    console.log(err)
  }
};