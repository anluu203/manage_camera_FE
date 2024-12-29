import axios from "@/config/axios";
import { User } from "@/type";

const handleFetchUsers = (page: number, results: number) => {
  return axios.get(`/api/v1/user/getAllUser?page=${page}&results=${results}`);
};

const handleCreateUser = (
  email: string | number,
  phone: number | string,
  username: string | number,
  password: string | number,
  groupId: number | string
) => {
  return axios.post("/api/v1/user/create", {
    email,
    phone,
    username,
    password,
    groupId,
  });
};
const handleUpdateUser = (
  id: string | number | undefined,
  username: string | number,
  groupId: string | number
) => {
  return axios.put("/api/v1/user/update", {
    id,
    username,
    groupId,
  });
};

const handleDeleteUser = (user: User | null) => {
  if (user) {
    return axios.delete("/api/v1/user/delete", { data: { id: user.id } });
  }
  return Promise.reject(new Error("User is null")); // Or handle null case as needed
};


export {
  handleFetchUsers,
  handleDeleteUser,
  handleCreateUser,
  handleUpdateUser,
};
