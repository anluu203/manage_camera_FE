//<div className="overflow-x-auto shadow-md sm:rounded-lg max-h-max">
// UserTable.tsx
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { User, UserTableProps } from "@/type";
import ButtonCustom from "../atoms/button/button";
import { CirclePlus, Trash, UserPen } from "lucide-react";
import { handleDeleteUser } from "@/service/usersService";
import DialogDelete from "../deleteDlg";
import CreateUpdateDialog from "../createUpdateDlg";


const UserTable: React.FC<UserTableProps> = ({ listUsers, fetchUsers, currentPage, currentResults }) => {


  
  const [openDialogDelete, setOpenDialogDelete] = useState(false)
  const [openDialogCreate, setDialogCreate] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User|null>(null)

  const [actionDialog, setActionDialog] = useState('CREATE')
  const [dataDialog, setDataDialog] = useState({})
  const [disabled, setDisabled] = useState<boolean>(false);


  const handleOpenDialogDelete = (user: User) => {
    setSelectedUser(user)
    setOpenDialogDelete(true);
  };

  const handleCloseDialogDelete = () => {
    setOpenDialogDelete(false);
    setSelectedUser(null)
  };


  const handleConfirmDelete  = async () =>{
    let response = await handleDeleteUser(selectedUser)
    if (response.data.EC === 0) {
      toast.success(response.data.EM)
      await fetchUsers()
    }else{
      toast.error(response.data.EM)
      await fetchUsers()
    }
    handleCloseDialogDelete()
  }

  const handleOpenDialogCreate = () => {
    setActionDialog('CREATE')
    setDialogCreate(true)
  }

  const handleCloseCreateUpdateDlg = () => {
    setDialogCreate(false)
    setDataDialog({})
    setDisabled(false)
  }

  const handleConfirmCreate = async () => {
    await fetchUsers();
  }

  const handleOpenDialogUpdate = (user: User) => {
    setDialogCreate(true)
    setActionDialog('UPDATE')
    setDataDialog(user)
    setDisabled(true)
  }
  return (
    <div className="relative  ">
      <div className="list-button mb-3">
        <ButtonCustom
          theme="add"
          fontWeight="600"
          onClick={() => handleOpenDialogCreate()}
        >
        <CirclePlus size={20} className="me-1"/>  
          Add new user
        </ButtonCustom>
      </div>
    <div className="">
    <table className="w-full min-w-[600px] text-sm text-left rtl:text-right text-gray-500 shadow-md sm:rounded-lg">
      <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
        <tr>
          <th scope="col" className="px-6 py-3">NO</th>
          <th scope="col" className="px-6 py-3">ID</th>
          <th scope="col" className="px-6 py-3">USER NAME</th>
          <th scope="col" className="px-6 py-3">PHONE</th>
          <th scope="col" className="px-6 py-3">EMAIL</th>
          <th scope="col" className="px-6 py-3">GROUP</th>
          <th scope="col" className="px-6 py-3">DESCRIPTION</th>
          <th scope="col" className="px-6 py-3">ACTION</th>
        </tr>
      </thead>
      <tbody>
        {listUsers && listUsers.length > 0 ? (
          listUsers.map((item, index) => (
            <tr key={`row-${index}`} className="bg-white border-b dark:bg-gray-800">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                { (currentPage - 1) * currentResults + index + 1}
              </th>
              <td className="px-6 py-4">{item.id}</td>
              <td className="px-6 py-4">{item.username}</td>
              <td className="px-6 py-4">{item.phone}</td>
              <td className="px-6 py-4">{item.email}</td>
              <td className="px-6 py-4">{item.group ? item.group.name : ''}</td>
              <td className="px-6 py-4">{item.group ? item.group.description : ''}</td>
              <td className="px-6 py-4 flex justify-center">
                <UserPen size={15} 
                  onClick={() => handleOpenDialogUpdate(item)}
                  className="me-1"
                  color={'#2a60b7'}
                  strokeWidth={2}
                  />
                <Trash size={15} 
                  onClick={() => handleOpenDialogDelete(item)} 
                  color={'#e43a3a'}
                  strokeWidth={2}
                  />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={7} className="p-4 text-sm text-gray-800 rounded-lg">
              <span className="font-medium">List user is empty</span>
            </td>
          </tr>
        )}
      </tbody>
    </table>
    </div>
    <div className="dialog-delete">
        <DialogDelete
          open={openDialogDelete}
          onClose={handleCloseDialogDelete}
          onConfirm={handleConfirmDelete }
        />
    </div>
    <div className="dialog-update">
        <CreateUpdateDialog
          open={openDialogCreate}
          onClose={handleCloseCreateUpdateDlg}
          onConfirm={handleConfirmCreate}
          actionDialog={actionDialog}
          dataDialog={dataDialog}
          disabled={disabled}
        />
    </div> 
    </div>
  );
};

export default UserTable;