import axios from 'axios';

export default axios.create({
    baseURL: `http://localhost:5820/`,
    headers: {
        'Content-Type': 'application/json'
    }
});