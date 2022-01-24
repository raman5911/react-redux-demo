import { React, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, getAllUsers } from "../actions/fetchAndPostUserAction";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

function TableComponent() {

  const dispatch = useDispatch();
  var usersData = useSelector((state) => state.usersReducer.usersData);

  useEffect(() => {

      //getting demo data from fake api when there is no data initially

      if(usersData.length <= 0) {
        dispatch(fetchUsers());
      }

      //if state already contains data then dispatching another action for getting all the data (including our own data)

      else
          dispatch(getAllUsers(usersData));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
              <TableCell>S.No</TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>Email Address</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Date of Joining</TableCell>
            <TableCell>Reporting Time</TableCell>
            <TableCell>Location</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {usersData.map((user, index) => (
            <TableRow>
                {console.log(user)}
              <TableCell>{index + 1}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.gender}</TableCell>
              <TableCell>{user.dateOfJoin}</TableCell>
              <TableCell>{user.reportTime}</TableCell>
              <TableCell>{user.location}</TableCell>
            </TableRow>
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableComponent;
