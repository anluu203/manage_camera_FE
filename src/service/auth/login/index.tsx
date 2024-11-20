import axios from "axios";

const handleLoginApi = (
  valueLogin: string | number,
  valuePassword: string | number
) => {
    return axios.post('http://localhost:8080/api/v1/login', {
        valueLogin,
        valuePassword
    }
)
};

export default handleLoginApi;