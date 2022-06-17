import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5001/challenge-55f9f/us-central1/api' //the api (cloud function) url
});

export default instance