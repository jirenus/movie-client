import axios from "axios";

export default axios.create({
    baseURL: 'http://localhost:8080/',
    headers: { 
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    }
});