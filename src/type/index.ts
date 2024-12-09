export interface PropDialog{
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    actionDialog:string;
    dataDialog:{};
    disabled:boolean
}
export interface User {
  id?: number;
  username: string;
  phone: string;
  password:string;
  email: string;
  group?: Group;
}
interface Role {
  id: number;
  name: string;
  description: string;
}

interface GroupWithRoles {
  id: number;
  name: string;
  description: string;
  roles: Role[];
}

export interface Account {
  email: string;
  username: string;
  groupWithRoles: GroupWithRoles;
}
export interface Auth {
  isAuthenticated: boolean,
  token?: string | number,
  account?: Account 
  isLoading: boolean
}
export interface UserDataProps {
    id?: number | string;
    email: string;
    userName: string;
    phone: number |string;
    password: string;
    groupId: string| number;
  }

export interface GroupProps{
    id?: number;
    name: string;
    description: string;
} 
export interface UserTableProps {
  listUsers: User[];
  fetchUsers: () => Promise<void>;
  currentResults: number
  currentPage:number
}  

export interface Group {
  id?: number;
  name: string;
  description: string;
}

