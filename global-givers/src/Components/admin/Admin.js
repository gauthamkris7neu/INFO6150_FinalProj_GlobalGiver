import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, Box, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useSelector(state => state.login);
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/admin/getAll', {
          params: { email: user.email }
        });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleApprove = async (orgEmail) => {
    try {
      await axios.put(`http://localhost:8000/api/admin/verfication`, { adminEmail: user.email, orgEmail, status: 'approved' });
      setModalOpen(true);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

  const handleReject = async (orgEmail) => {
    try {
      await axios.put(`http://localhost:8000/api/admin/verfication`, { adminEmail: user.email, orgEmail, status: 'rejected' });
      setModalOpen(true);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error rejecting user:', error);
    }
  };

  const handleClose = () => {
    setModalOpen(false);
    fetchUsers();
  };

  const viewImage = (fileInfo) => {
    setSelectedUser(fileInfo);
    setModalOpen(true);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button onClick={() => handleApprove(user.email)}>Approve</Button>
                  <Button onClick={() => handleReject(user.email)}>Reject</Button>
                  <Button onClick={() => viewImage(user.fileInfo)}>View Image</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for confirmation or image viewing */}
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box sx={style}>
          {selectedUser ? (
            <img src={`http://localhost:8000/${selectedUser}`} alt="User document" style={{ width: '100%' }} />
          ) : (
            <Typography id="modal-modal-title" variant="h6" component="h2">
              User has been updated successfully.
            </Typography>
          )}
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AdminPage;