import axios from "axios";
import { apiBasePath } from "../constants/paths";

const instance = axios.create({
  baseURL: apiBasePath,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
});

export default instance;
