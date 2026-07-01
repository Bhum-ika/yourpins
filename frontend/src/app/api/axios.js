import axios from "axios";

//created centralized axios instance
//set the baseURL to ease up writing it everywhere
const api=axios.create({
    baseURL:'http://localhost:5000/api'
});

//automatically adds token before every request
api.interceptors.request.use((config)=>{
    const token=localStorage.getItem("token");
    if(token){
        config.headers.Authorization=`Bearer ${token}`
    }
    return config;
})
export default api;