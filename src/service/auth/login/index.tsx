import axios from "@/config/axios"

const handleLoginApi = (
  valueLogin: string | number,
  valuePassword: string | number
) => {
    return axios.post('/api/v1/login', {
        valueLogin,
        valuePassword
    }
)
};

export default handleLoginApi;