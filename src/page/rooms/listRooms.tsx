import React from "react";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { RoomCard } from "@/component/atoms/roomCard";
import { fetchRoom, deleteRoom } from "@/service/rooms";
import ButtonCustom from "@/component/atoms/button/button";
import { Room } from "@/type";
import CreateUpdateDialogRoom from "@/component/createUpdateDlgRoom";
import DialogDelete from "@/component/deleteDlg";

const ManageRoom: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([])
    const [openDialogDelete, setOpenDialogDelete] = useState(false)
    const [openDialogCreate, setDialogCreate] = useState(false)
    const [selectedRoom, setSelectedRoom] = useState<Room|null>(null)
  
    const [actionDialog, setActionDialog] = useState('CREATE')
    const [dataDialog, setDataDialog] = useState<Room | {}>({})
    const [disabled] = useState<boolean>(false);

  // hàm tải ds room 
  const handleFetchRoom = useCallback(async () =>{
    let res = await fetchRoom()
    setRooms(res.data.DT)
  },[fetchRoom])

  const handleOpenDialogDelete = (room: Room) => {
    setSelectedRoom(room)
    setOpenDialogDelete(true);
  };  
  //close dialog
  const handleCloseDialogDelete = () => {
    setOpenDialogDelete(false);
    setSelectedRoom(null)
  };
  // xác nhận xóa room
  const handleConfirmDelete  = async () =>{
    let response = await deleteRoom(selectedRoom)
    if (response.data.EC === 0) {
      toast.success(response.data.EM)
      handleFetchRoom()
    }else{
      toast.error(response.data.EM)
      await fetchRoom()
    }
    handleCloseDialogDelete()
  }
  // hàm mở dialog create
  const handleOpen = () =>{
    setDialogCreate(true)
  }
  // hàm xác nhận update, sau khi update sẽ tải ds room
  const handleConfirm =() =>{
    handleFetchRoom()
  }

  // hàm close create_update dialog (dùng chung cho cả 2 dialog)
  const handleClose = () =>{
    setDialogCreate(false)
    setDataDialog({})
  }

  //mở update dialog
  const handleOpenDialogUpdate = (room: Room) => {
    setDialogCreate(true)
    setActionDialog('UPDATE')
    setDataDialog(room)
  } 

  //  useCallback helps this logic don't loop 
  useEffect(() =>{
    handleFetchRoom()
  },[handleFetchRoom])
  return (
    <div className="p-4">
      <div className="mb-6">
      <h1 className="mb-4 text-center text-3xl font-bold">
        Rooms list
      </h1>
      <ButtonCustom
        onClick={() => handleOpen()}
        theme="add"
      >
        Add new room
      </ButtonCustom>
      </div>

    <div className="list-room-container mt-2">
    <div className="grid gap-14 md:grid-cols-3 md:gap-5">
      {
        rooms.map((room, index) => (
          <RoomCard
            key={room.id}
            name={room.name}
            address={room.address}
            description={room.description}
            onClickUpdate={() => handleOpenDialogUpdate(room)}
            onClickDelete={() => handleOpenDialogDelete(room)}
          />
        ))
      }
      </div>
    </div>
        <div className="dialog-update">
            <CreateUpdateDialogRoom
              open={openDialogCreate}
              onClose={handleClose}
              onConfirm={handleConfirm}
              actionDialog={actionDialog}
              dataDialog={dataDialog}
              disabled={disabled}
            />
        </div>
            <div className="dialog-delete">
                <DialogDelete
                  tittle="Delete room"
                  description="Do you want to delete this room ?"
                  open={openDialogDelete}
                  onClose={handleCloseDialogDelete}
                  onConfirm={handleConfirmDelete }
                />
            </div> 
    </div>
  );
};

export default ManageRoom;
