import React from "react";
import { Paper, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const fakeRooms = [
  { id: 1, name: "Phòng họp", address: "Tầng 1", description: "Phòng họp chính" },
  { id: 2, name: "Phòng nghỉ", address: "Tầng 2", description: "Khu vực nghỉ ngơi" },
];

const ManageRoom: React.FC = () => {
  return (
    <div className="p-4">
      <Typography variant="h5" className="mb-4">
        Quản lý Phòng
      </Typography>
      <Button variant="contained" color="primary" className="mb-4">
        Thêm Phòng
      </Button>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Địa chỉ</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fakeRooms.map((room) => (
              <TableRow key={room.id}>
                <TableCell>{room.id}</TableCell>
                <TableCell>{room.name}</TableCell>
                <TableCell>{room.address}</TableCell>
                <TableCell>{room.description}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" size="small" className="mr-2">
                    Sửa
                  </Button>
                  <Button variant="outlined" color="secondary" size="small">
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default ManageRoom;
