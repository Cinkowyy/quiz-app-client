import axios from "axios";

// const baseURL = process.env.BASE_API_URL // process is not defined

const baseURL = 'http://localhost:5500'
export default axios.create({
    baseURL
})