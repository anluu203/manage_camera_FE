import axios from "@/config/axios"


const handleFetchUsers = (page:number, results:number) => {
    return axios.get(`/api/v1/user/getAllUser?page=${page}&results=${results}`)
};


export {handleFetchUsers}
