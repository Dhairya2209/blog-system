import axios from "axios";

const API = axios.create({
    baseURL: "https://blog-system-1k8a.onrender.com/api",
});

export default API;