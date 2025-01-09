import axios from "@/config/axios"
import { Camera } from "@/type";

export const fetchCamera = () => {
    return axios.get('/api/v1/camera/read')
};
export const createCamera = ({name, description, ipAddress, status, roomID}:Camera) => {
    return axios.post('/api/v1/camera/create',{name, description, ipAddress, status, roomID})
};