import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-d9f4e-default-rtdb.firebaseio.com/",
});

export default instance;
