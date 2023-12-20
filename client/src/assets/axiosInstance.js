import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const axiosBase = axios.create({
  baseURL: API_URL,
});

const axiosWithCredentials = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export { axiosBase, axiosWithCredentials };
