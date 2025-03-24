import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to fetch data (GET request)
export const getData = async (endpoint: string, params: any) => {
  try {
    // const token = sessionStorage.getItem("Sec_User_toc");
    const response = await api.get(`/${endpoint}`, {
      params: params,
      // headers: { Authorization: `Token ${token}` },
    });
    // console.log(response);
    return response;
  } 
  catch (error) {
    console.error("GET request error:", error);
    throw error;
  }
};

// Function to send data (POST request)
export const postData = async (endpoint: string, params: string, data: any) => {
  try {
    // const token = sessionStorage.getItem("Sec_User_toc");
    const response = await api.post(`/${endpoint}`, data, {
      params: params ,
      // headers: { Authorization: `Token ${token}` },
    });
    return response.data;
  } 
  catch (error) {
    console.error("POST request error:", error);
    throw error;
  }
};

export default api;