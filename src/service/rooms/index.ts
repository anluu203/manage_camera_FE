import axios from "@/config/axios"
import { Room } from "@/type";

export const fetchRoom = () => {
    return axios.get('/api/v1/room/read')
};

export const createRoom = ({name, description, address}:Room) => {
    return axios.post('/api/v1/room/create',{name, description, address})
};

export const updateRoom = ({id,name, description, address}:Room) => {
    return axios.put('/api/v1/room/update',{id,name, description, address})
};

export const deleteRoom = (room: Room | null) => {
    if (room) {
      return axios.delete("/api/v1/room/delete", { data: { id: room.id } });
    }
    return Promise.reject(new Error("room is null")); // Or handle null case as needed
  };
  
