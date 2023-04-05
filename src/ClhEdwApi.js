import axios from "axios";

const ClhEdwApi = axios.create({
    baseURL: "http://localhost:63665/api",
});

export default ClhEdwApi;
