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
import { Room, PropDialog } from '@/type';
import { createRoom, updateRoom } from '@/service/rooms';






export default function CreateUpdateDialogRoom({open, onClose, onConfirm, actionDialog, dataDialog, disabled, ...props}: PropDialog) {
const defaultRoomData:Room = {
    id:'',
    name: '',
    address:'',
    description:'',
  } 

  const defaultValidInput = {
    id:true,
    name: true,
    address: true,
    description: true,
  }

  const [roomData, setRoomData] = useState(defaultRoomData)
  const [validInput, setValidInput] = useState(defaultValidInput)



  const handleOnchangeInput = (value: string, name: keyof Room ) => {
    let _roomData = _.cloneDeep(roomData);
    _roomData[name] = value;
    setRoomData(_roomData);
  };
  // const handleOnchangeInput = ( ) => {
  //   setRoomData(roomData);
  // };

  const checkValidateInput = () => {
    setValidInput(defaultValidInput); // Reset trạng thái
    let arr: (keyof Room)[] = ['name', 'address', 'description'];
  
    let _validInputs = _.cloneDeep(defaultValidInput);
    let check = arr.every((field) => {
      if (!roomData[field]) {
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
      let room = roomData;
      // let res = await handleCreateUser(data.email, data.phone, data.userName, data.password, data.groupId)
      let res = await createRoom({name: room.name, description: room.description, address:room.address} )
      console.log(res)
      let validate = res.data
      if (validate.EC === 0) {
        toast.success(validate.EM)
        setRoomData(defaultRoomData)
        onConfirm()
        handleClose()
      } else {
        toast.error(validate.EM)
      }
    }
  }

  const handleUpdate = async () => {
    let room = roomData;
    let res= await updateRoom({id:room.id,name: room.name, description: room.description, address:room.address})
    let validate = res.data
      if (validate.EC === 0) {
        toast.success(validate.EM)
        setRoomData(defaultRoomData)
        onConfirm()
        handleClose()
      } else {
        toast.error(validate.EM)
      }
    }


  useEffect(() => {
    setRoomData(dataDialog as Room)

}, [dataDialog]);
  let inputClassNameDisable = 'my-1 w-full text-sm text-gray-900 bg-gray-200 border-0 border-b-2 border-gray-300 rounded-none'
  let inputClassName =  'my-1 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 rounded-none'
  let inputClassNameError = 'my-1 w-full text-sm text-gray-900 bg-red-50 focus:bg-red-50 border-0 border-b-2 border-red-500 placeholder-red-600 text-red-900 focus:border-red-600 rounded-none'
  return (
    <React.Fragment>
      <Dialog
        {...props}
        open={open}
        onClose={handleClose}
        aria-describedby="alert-dialog-description"
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-title">
          {actionDialog === 'CREATE' ? 'Create new room' : 'Update current room'}
        </DialogTitle>
        <Divider/>
        <DialogContent>
            <div className='grid grid-cols-2 gap-4'>
                <div>
                    <InputReuseable
                    label={'Name'}
                    variant='standard'
                    value={roomData.name}
                    disabled={disabled}
                    onChange={(e) => handleOnchangeInput(e.target.value, "name")}
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
                    label={'Address'}
                    variant='standard'
                    value={roomData.address}
                    onChange={(e) => handleOnchangeInput(e.target.value, "address")}
                    className={
                      Object.values(validInput).some((value) => !value)
                        ? inputClassNameError
                        : inputClassName
                    }
                    />
                </div>
                <div>
                    <InputReuseable
                    label={'Description'}
                    variant='standard'
                    value={roomData.description}
                    disabled={disabled}
                    onChange={(e) => handleOnchangeInput(e.target.value, "description")}
                    className={
                      disabled 
                        ? inputClassNameDisable
                        : Object.values(validInput).some((value) => !value)
                        ? inputClassNameError
                        : inputClassName
                    }
                    />
                </div>
                {/* <div>
                    <InputReuseable
                    label={'Password'}
                    variant='standard'
                    value={roomData.password}
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
                </div> */}
            </div>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={actionDialog === "CREATE" ? handleCreate : handleUpdate}>
            {actionDialog === "CREATE" ? "CREATE" : "SAVE"}
          </Button>
           {/* <Button onClick={handleCreate }>
           CREATE
          </Button> */}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}