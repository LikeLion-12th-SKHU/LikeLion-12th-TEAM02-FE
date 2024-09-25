// src/api/instance.js
import axios from "axios";

const loginInstance = axios.create({
  baseURL: process.env.REACT_APP_REDIRECT_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export default loginInstance;
