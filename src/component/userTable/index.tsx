//<div className="overflow-x-auto shadow-md sm:rounded-lg max-h-max">
// UserTable.tsx
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { User } from "@/page/users";
// import ButtonBase from "../../atoms/button/button";
// import { handleDeleteUser } from "@/services/userService";
// import DialogDelete from "../dialogDelete";
// import DialogCreate from "../dialogCreate";
interface UserTableProps {
  listUsers: User[];
  fetchUsers: () => Promise<void>;
  currentResults: number
  currentPage:number
}

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


  // const handleConfirmDelete  = async () =>{
  //   let response = await handleDeleteUser(selectedUser)
  //   if (response.data.EC === 0) {
  //     toast.success(response.data.EM)
  //     await fetchUsers()
  //   }else{
  //     toast.error(response.data.EM)
  //     await fetchUsers()
  //   }
  //   handleCloseDialogDelete()
  // }

  const handleOpenDialogCreate = () => {
    setActionDialog('CREATE')
    setDialogCreate(true)
  }

  const handleCloseDialogCreate = () => {
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
    <>
      {/* <div className="list-button mb-3">
        <ButtonBase
          theme="add"
          style={{marginRight:'1rem'}}
        >
          Refresh
        </ButtonBase>

        <ButtonBase
          theme="add"
          onClick={() => handleOpenDialogCreate()}
        >
          Add new user
        </ButtonBase>
      </div> */}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500  overflow-x-auto shadow-md sm:rounded-lg">
      <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
        <tr>
          <th scope="col" className="px-6 py-3">NO</th>
          <th scope="col" className="px-6 py-3">ID</th>
          <th scope="col" className="px-6 py-3">USER NAME</th>
          <th scope="col" className="px-6 py-3">PHONE</th>
          <th scope="col" className="px-6 py-3">EMAIL</th>
          <th scope="col" className="px-6 py-3">GROUP</th>
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
              <td className="px-6 py-4">
              {/* <ButtonBase
                    theme="add"
                    onClick={() => handleOpenDialogUpdate(item)}
                >
                      Edit
                      </ButtonBase>
                <ButtonBase
                    theme="cancel"
                    style={{marginLeft:'1rem'}}
                    onClick={() => handleOpenDialogDelete(item)}
                >
                    Delete
                </ButtonBase> */}
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
    {/* <div className="dialog-delete">
        <DialogDelete
          open={openDialogDelete}
          onClose={handleCloseDialogDelete}
          onConfirm={handleConfirmDelete }
        />
    </div>
    <div className="dialog-update">
        <DialogCreate
          open={openDialogCreate}
          onClose={handleCloseDialogCreate}
          onConfirm={handleConfirmCreate}
          actionDialog={actionDialog}
          dataDialog={dataDialog}
          disabled={disabled}
        />
    </div> */}
    </>
  );
};

export default UserTable;