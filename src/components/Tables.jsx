import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { tableApiAction } from "../store/store";
import { Button } from "@mui/material";

const Tables = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  function createData(avatar, firstName, lastName, email, id, isEditable) {
    return { avatar, firstName, lastName, email, id, isEditable };
  }

  const store = useSelector((state) => state.table);
  let rows = [];
  if (isLoaded) {
    rows = store.map((item) =>
      createData(
        item.avatar,
        item.first_name,
        item.last_name,
        item.email,
        item.id,
        item.isEditable
      )
    );
  }
  const dispatch = useDispatch();
  const getApi = async () => {
    const res = await axios.get("https://reqres.in/api/users?page=1");
    if (res.status === 200) {
      setTimeout(() => {
        setIsLoaded(true);
      }, 2000);
      console.log(res.data.data);
      dispatch(tableApiAction.addToTable(res.data.data));
    }
  };
  useEffect(() => {
    getApi();
  }, []);

  const onDeleteHandler = (id) => {
    dispatch(tableApiAction.removeFromTable(id));
  };
  const onEditHandler = (id) => {
    dispatch(tableApiAction.editFromTable(id));
  };
  const onChangeFname = (e, index) => {
    dispatch(tableApiAction.editFname({ e: e.target.value, index: index }));
  };
  const onChangeLname = (e, index) => {
    dispatch(tableApiAction.editLname({ e: e.target.value, index: index }));
  };
  const onChangeEmail = (e, index) => {
    dispatch(tableApiAction.editEmail({ e: e.target.value, index: index }));
  };
  return (
    <div>
      {isLoaded && store.length !== 0 && (
        <TableContainer sx={{ marginTop: "10px" }} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell align="right">First Name</TableCell>
                <TableCell align="right">Last Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Edit/Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <img
                      style={{
                        width: "50px",
                        height: "50px",
                        padding: 0,
                        margin: 0,
                      }}
                      src={row.avatar}
                    />
                  </TableCell>
                  {!row.isEditable && (
                    <>
                      <TableCell align="right">{row.firstName}</TableCell>
                      <TableCell align="right">{row.lastName}</TableCell>
                      <TableCell align="right">{row.email}</TableCell>
                      <TableCell align="right">
                        <Button
                          onClick={() => onEditHandler(row.id)}
                          color="primary"
                          variant="contained"
                          sx={{ width: "80px" }}
                        >
                          Edit
                        </Button>
                        <Button
                          sx={{ width: "80px", marginLeft: "20px" }}
                          onClick={() => onDeleteHandler(row.id)}
                          color="warning"
                          variant="contained"
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </>
                  )}
                  {row.isEditable && (
                    <>
                      <TableCell align="right">
                        <input
                          onChange={(e) => onChangeFname(e, index)}
                          value={store[index].first_name}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <input
                          onChange={(e) => onChangeLname(e, index)}
                          value={store[index].last_name}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <input
                          onChange={(e) => onChangeEmail(e, index)}
                          value={store[index].email}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          sx={{ width: "80px" }}
                          onClick={() => onEditHandler(row.id)}
                          color="primary"
                          variant="contained"
                        >
                          Save
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {!isLoaded && (
        <div style={{ textAlign: "center", padding: "200px" }}>
          {" "}
          Loading....
        </div>
      )}
      {isLoaded && store.length === 0 && (
        <div
          style={{ padding: "300px", textAlign: "center", fontSize: "40px" }}
        >
          No Data To Show. Please refresh to see data.
        </div>
      )}
    </div>
  );
};
export default Tables;
