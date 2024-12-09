import React, { createContext, useReducer, ReactNode, Dispatch } from "react";
import { User } from "@/type";
import { getUserAccount } from "@/service/auth/getUserAccount";
// Định nghĩa kiểu dữ liệu cho trạng thái


interface UserState {
  user: User | null;
  loading: boolean; // Thêm trạng thái loading
  error: string | null; // Thêm trạng thái error
}

// Định nghĩa kiểu cho action
type UserAction =
  | { type: "SET_USER"; payload: User }
  | { type: "CLEAR_USER" }
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: User }
  | { type: "FETCH_ERROR"; payload: string };

// Định nghĩa kiểu cho Context
interface UserContextProps {
  state: UserState;
  dispatch: Dispatch<UserAction>;
  fetchAccount: () => Promise<void>; // Hàm lấy dữ liệu user từ server
}

// Khởi tạo trạng thái ban đầu
const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

// Tạo Context
const UserContext = createContext<UserContextProps | undefined>(undefined);

// Reducer
const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "CLEAR_USER":
      return { ...state, user: null };
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, user: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// Provider
const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Hàm lấy dữ liệu user từ server
  const fetchAccount = async () => {
    try {
      dispatch({ type: "FETCH_START" });

      // Giả sử API endpoint của bạn là `/api/users/:id`
      const response = await getUserAccount();
      dispatch({ type: "FETCH_SUCCESS", payload: response.data });
    } catch (error: any) {
      dispatch({
        type: "FETCH_ERROR",
        payload: error.response?.data?.message || "An error occurred",
      });
    }
  };

  return (
    <UserContext.Provider value={{ state, dispatch, fetchAccount }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
