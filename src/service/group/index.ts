import axios from "@/config/axios"

export const fetchGroup = () => {
    return axios.get('/api/v1/group/read')
};
