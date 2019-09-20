import axios from 'axios'


const apiItunes = axios.create({
    baseURL: 'http://localhost:3000/api/search',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json', 
    },
    timeout: 10000
})

export default {
    async searchItunes(data){  
        return await apiItunes.post('/', data)
    }
}