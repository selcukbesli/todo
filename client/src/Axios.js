import axios from "axios";

let envDependentBaseUrl = "http://localhost:3001/api/";

if (process.env.NODE_ENV === "production") {
  envDependentBaseUrl = "https://fierce-plains-91090.herokuapp.com/api/";
}
const Axios = axios.create({
  baseURL: envDependentBaseUrl,
});

export default Axios;
