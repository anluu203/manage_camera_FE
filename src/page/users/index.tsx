import PaginationComponent from "@/component/pagination";
import UserTable from "@/component/userTable";
import { useEffect, useState, useCallback } from "react";
import { handleFetchUsers } from "@/service/users";
import { User } from "@/type";

const UsersPage = () => {
  const [listUsers, setListUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentResults] = useState(3);
  const [totalPages, setTotalPages] = useState(0);

  const fetchUsers = useCallback(async () => {
    var response = await handleFetchUsers(currentPage, currentResults);
    if (response.data.EC === 0) {
      setTotalPages(response.data.DT.totalPages);
      setListUsers(response.data.DT.users);
    }
  }, [currentPage, currentResults]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  return (
    <div className="user-page ">
      <h1 className="text-center text-3xl font-bold my-3">User List</h1>
      <UserTable
        listUsers={listUsers}
        fetchUsers={fetchUsers}
        currentPage={currentPage}
        currentResults={currentResults}
      />
      {totalPages > 0 && (
        <PaginationComponent
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handleChangePage}
        />
      )}
    </div>
  );
};
export default UsersPage;
