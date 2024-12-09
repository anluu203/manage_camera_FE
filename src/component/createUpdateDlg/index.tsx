import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider } from '@mui/material';
import InputReuseable from '@/component/atoms/input/input';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { UserDataProps, GroupProps, PropDialog } from '@/type';
import { User } from '@/type';
import { fetchGroup } from '@/service/group';
import { handleUpdateUser, handleCreateUser } from '@/service/usersService';





export  const mapUserToUserDataProps = (user: User): UserDataProps => {
  return {
    id: user.id, // Thêm ánh xạ id
    email: user.email,
    userName: user.username, // Chú ý viết đúng key "userName" thay vì "username"
    phone: user.phone,
    password: '', // Không truyền mật khẩu từ User
    groupId: user.group?.id || '',
  };
};
export default function CreateUpdateDialog({open, onClose, onConfirm, actionDialog, dataDialog, disabled}: PropDialog) {
const defaultUserData:UserDataProps = {
    id: '',
    email: '',
    userName:'',
    phone:'',
    password:'',
    groupId: 2,
  } 

  const defaultValidInput = {
    id:true,
    email: true,
    userName: true,
    phone: true,
    password: true,
    groupId: true,
  }

  const [userData, setUserData] = useState(defaultUserData)
  const [group, setGroup ] = useState<GroupProps[]| []>([])
  const [validInput, setValidInput] = useState(defaultValidInput)

  const handleFetchGroup = async () =>{
    let response = await fetchGroup()
    if (response.data.EC === 0) {
      setGroup(response.data.DT as GroupProps[]);
      if (response.data.DT && response.data.DT.length > 0) {
        let group = response.data.DT;
        setUserData({...userData, groupId: group[0].id })
      }
    } else {
      toast.error(response.data.EM)
    }
  }

  const handleOnchangeInput = (value: string, name: keyof UserDataProps ) => {
    let _userData = _.cloneDeep(userData);
    _userData[name] = value;
    setUserData(_userData);
  };

  const checkValidateInput = () => {
    setValidInput(defaultValidInput); // Reset trạng thái
    let arr: (keyof UserDataProps)[] = ['email', 'userName', 'phone', 'password'];
  
    let _validInputs = _.cloneDeep(defaultValidInput);
    let check = arr.every((field) => {
      if (!userData[field]) {
        _validInputs[field] = false;
        return false; // Nếu bất kỳ giá trị nào trống, `every` sẽ trả về false
      }
      return true;
    });
  
    setValidInput(_validInputs);
  
    if (!check) {
      toast.error('Some inputs are empty'); // Gộp thông báo lỗi
    }
  
    return check;
  };
  
  const handleClose = () => {
    onClose();
    setValidInput(defaultValidInput)
  }

  const handleCreate = async () =>{
    let check = checkValidateInput()
    if (check) {
      let data = userData;
      let res = await handleCreateUser(data.email, data.phone, data.userName, data.password, data.groupId)
      let validate = res.data
      if (validate.EC === 0) {
        toast.success(validate.EM)
        setUserData(defaultUserData)
        onConfirm()
        handleClose()
      } else {
        toast.error(validate.EM)
      }
    }
  }

  const handleUpdate = async () => {
    let data = userData;
    let res= await handleUpdateUser(data.id,data.userName, data.groupId)
    let validate = res.data
      if (validate.EC === 0) {
        toast.success(validate.EM)
        setUserData(defaultUserData)
        onConfirm()
        handleClose()
      } else {
        toast.error(validate.EM)
      }
    }

  useEffect(() => {
    handleFetchGroup();
  }, []);

  useEffect(() => {
  if (dataDialog && 'id' in dataDialog) {
    const mappedData = mapUserToUserDataProps(dataDialog as User); // Ép kiểu
    setUserData(mappedData);
    console.log('mapped data :', mappedData)
  } else {
    setUserData(defaultUserData); // Sử dụng dữ liệu mặc định nếu không hợp lệ
  }
}, [dataDialog]);
  let inputClassNameDisable = 'my-1 w-full text-sm text-gray-900 bg-gray-200 border-0 border-b-2 border-gray-300 rounded-none'
  let inputClassName =  'my-1 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 rounded-none'
  let inputClassNameError = 'my-1 w-full text-sm text-gray-900 bg-red-50 focus:bg-red-50 border-0 border-b-2 border-red-500 placeholder-red-600 text-red-900 focus:border-red-600 rounded-none'
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-describedby="alert-dialog-description"
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-title">
          {actionDialog === 'CREATE' ? 'Create new user' : 'Update current uer'}
        </DialogTitle>
        <Divider/>
        <DialogContent>
            <div className='grid grid-cols-2 gap-4'>
                <div>
                    <InputReuseable
                    label={'Email address'}
                    variant='standard'
                    value={userData.email}
                    disabled={disabled}
                    type="email"
                    onChange={(e) => handleOnchangeInput(e.target.value, "email")}
                    className={
                      disabled 
                        ? inputClassNameDisable
                        : Object.values(validInput).some((value) => !value)
                        ? inputClassNameError
                        : inputClassName
                    }
                    />
                </div>
                <div>
                    <InputReuseable
                    label={'User name'}
                    variant='standard'
                    value={userData.userName}
                    onChange={(e) => handleOnchangeInput(e.target.value, "userName")}
                    className={
                      Object.values(validInput).some((value) => !value)
                        ? inputClassNameError
                        : inputClassName
                    }
                    />
                </div>
                <div>
                    <InputReuseable
                    label={'Phone number'}
                    variant='standard'
                    value={userData.phone}
                    disabled={disabled}
                    onChange={(e) => handleOnchangeInput(e.target.value, "phone")}
                    className={
                      disabled 
                        ? inputClassNameDisable
                        : Object.values(validInput).some((value) => !value)
                        ? inputClassNameError
                        : inputClassName
                    }
                    />
                </div>
                <div>
                    <InputReuseable
                    label={'Password'}
                    variant='standard'
                    value={userData.password}
                    type="password"
                    disabled={disabled}
                    onChange={(e) => handleOnchangeInput(e.target.value, "password")}
                    className={
                      disabled 
                        ? inputClassNameDisable
                        : Object.values(validInput).some((value) => !value)
                        ? inputClassNameError
                        : inputClassName
                    }
                    />
                </div>
            </div>

            <form className="mt-4 w-full grid grid-cols-2 gap-4 mx-auto">
                <div>
                    <label htmlFor="group" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Group</label>
                    <select id="group" 
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      value={userData.groupId}
                      onChange={(e) => handleOnchangeInput(e.target.value, "groupId")}
                      >
                    {group.length > 0 ? (
                          group.map((item, index) => {
                            return (
                              <option key={index} value={item.id}>{item.name}</option>
                            )
                          }
                        )
                        ) : (
                              <option value="">Loading groups...</option>
                      )}
                    </select>
                </div>
            </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={actionDialog === "CREATE" ? handleCreate : handleUpdate}>
            {actionDialog === "CREATE" ? "CREATE" : "SAVE"}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}