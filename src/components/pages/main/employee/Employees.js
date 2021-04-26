import React, { useState, useEffect } from 'react'
import EmployeeForm from "./EmployeeForm";
import { Column, Row } from 'simple-flexbox';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import './employee.styles.scss';
import useTable from "../../../utilities/useTable";
import { ToastContainer } from 'react-toastify';
import * as employeeService from "../../../../services/employeeService";
import StatComponent from '../../stat-page/StatComponent';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from "react-redux";
import Controls from "../../../controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from "../../../utilities/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from "../../../utilities/Notification";
import ConfirmDialog from "../../../utilities/ConfirmDialog";
import AddEmployeeForm from './AddEmployeForm';
import UserLocationForm from './UserLocationForm';
import Pagination from '../../../utilities/Pagination';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))


const headCells = [
    { id: 'fullName', label: 'Employee Name' },
    { id: 'LastName', label: 'Last Name' },
    { id: 'mobile', label: 'Mobile Number' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

const employees = [
    {firstName: 'Jokoyosky', lastName: 'Makanga', mobile: '080', actions: 'View'},
    {firstName: 'Jokoyosky', lastName: 'Makanga', mobile: '080', actions: 'View'},
    {firstName: 'Jokoyosky', lastName: 'Makanga', mobile: '080', actions: 'View'},
    {firstName: 'Jokoyosky', lastName: 'Makanga', mobile: '080', actions: 'View'},
    {firstName: 'Jokoyosky', lastName: 'Makanga', mobile: '080', actions: 'View'},
    {firstName: 'Jokoyosky', lastName: 'Makanga', mobile: '080', actions: 'View'},
    {firstName: 'Jokoyosky', lastName: 'Makanga', mobile: '080', actions: 'View'},
    {firstName: 'Jokoyosky', lastName: 'Makanga', mobile: '080', actions: 'View'},
    {firstName: 'Jokoyosky', lastName: 'Makanga', mobile: '080', actions: 'View'},
    {firstName: 'Jokoyosky', lastName: 'Makanga', mobile: '080', actions: 'View'},
    {firstName: 'Makanga', lastName: 'Makanga', mobile: '080', actions: 'View'},
    {firstName: 'Jokoyosky', lastName: 'Makanga', mobile: '080', actions: 'View'},
    {firstName: 'Jokoyosky', lastName: 'Makanga', mobile: '080', actions: 'View'},
]

export function Employees({ users, UpdateUser, LoadUsers, cacNumber, AddUser ,userType}) {


    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [addOpenPopup, setAddOpenPopup] = useState(false)
    const [userLocationOpenPopup, setuserLocationOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [ confirmDialog, setConfirmDialog ] = useState({ isOpen: false, title: '', subTitle: '' })
    const [ usersToDisplay, setUsersToDisplay ] = useState([])
    const pageSize = 10;
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(users.length == 0 ? users : users.userInfo, headCells, filterFn);

   

    const displayUsers = (pageNo = 1, callback) => {
        const userList = employees.slice((pageNo - 1) * pageSize, (pageNo * pageSize)).map((value, index) => {
        const { firstName, lastName, mobile, actions} = value;
        return (
            <TableRow key={index}>
                <TableCell className="font-weight-bold">{firstName} </TableCell>
                <TableCell className="font-weight-bold">{lastName}</TableCell>
                <TableCell className="font-weight-bold">{mobile}</TableCell>
                <TableCell className="font-weight-bold">{actions}</TableCell>
                {/* <TableCell className="table-date">
                    {shortDayNames[d.getDay() - 1]} {d.getDate()},{" "}
                    {shortMonthNames[d.getMonth()]} {d.getFullYear()}
                </TableCell> */}
                {/* {status.toUpperCase() === "ACTIVE" ? (
                    <TableCell className="table-status">
                    <div className="status-btn success">{"Active"}</div>
                    </TableCell>
                ) : (
                    <TableCell className="table-status">
                    <div className="status-btn error">{"Suspended"}</div>
                    </TableCell>
                )}
                {getUserProperties().permissions.indexOf(permissions.VIEW_USER) > 1 && <TableCell className="table-action" onClick={() => callback(value)}>
                    
                    View
                </TableCell>} */}
            </TableRow>
        );
        });
        setUsersToDisplay(userList)
    };
 useEffect(() => {
     LoadUsers(cacNumber);
     displayUsers(1, () => {
     });
   return () => {};
 }, []);
    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {

                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.firstName.toLowerCase().includes(target.value))
            }
        })
    }

    const addOrEdit = (employee, resetForm) => {
        if (employee.id === 0)
            AddUser(employee)
        else
            var data = { ...employee, 'userId': employee.id }
        UpdateUser(data)
        resetForm()
        // setRecordForEdit(null)
        setOpenPopup(false)
        setNotify({
            isOpen: true,
            message: 'Submitted Successfully',
            type: 'success'
        })
    }




    const addEmployee = (employee, resetForm) => {
        AddUser(employee)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }
    const userLocationInPopup = item => {
        setRecordForEdit(item)
        setuserLocationOpenPopup(true)
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        employeeService.deleteEmployee(id);
        var record = employeeService.getAllEmployees()
    }
    return (
    //   <div style={{overflowX: "scroll", height: "700px"}}>
      <div style={{overflowX: "scroll"}}>
        <Column flexGrow={1}>
          <StatComponent />
          <ToastContainer />
          <div style={{margin: "10px 0px 0px 80px", width: "95%"}}>
            <Controls.Input
              label="Search Employees"
              className={classes.searchInput}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              onChange={handleSearch}
            />
          </div>
          <Paper className={classes.pageContent}>
            <Toolbar>
              <Controls.Button
                text="Add New"
                variant="outlined"
                startIcon={<AddIcon />}
                className={classes.newButton}
                onClick={() => {
                  setAddOpenPopup(true);
                  setRecordForEdit(null);
                }}
              />
            </Toolbar>
            <TblContainer>
              <TblHead />
              <TableBody>
                {/* {recordsAfterPagingAndSorting().map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.firstName}</TableCell>
                    <TableCell>{item.lastName}</TableCell>
                    <TableCell>{item.phoneNumber}</TableCell>
                    <TableCell>
                      <Controls.ActionButton
                        color="primary"
                        onClick={() => {
                          openInPopup(item);
                        }}
                      >
                        <EditOutlinedIcon fontSize="small" />
                      </Controls.ActionButton>
                      <Controls.ActionButton
                        color="primary"
                        onClick={() => {
                          userLocationInPopup(item);
                        }}
                      >
                        <EditOutlinedIcon fontSize="small" />
                      </Controls.ActionButton>
                    </TableCell>
                  </TableRow>
                ))} */}
                  {employees.length > 0 && usersToDisplay}
              </TableBody>
            </TblContainer>
            {/* <TblPagination /> */}
                <Pagination count={employees.length} pageSize={pageSize} fetchMethod={(value, pageSize) => {
                    displayUsers(value);
                }} />
                </Paper>
          <Popup
            title="Employee Form"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
            <EmployeeForm
              recordForEdit={recordForEdit}
              addOrEdit={addOrEdit}
              roles={users.roles}
            />
          </Popup>

          <Popup
            title="Update User Location"
            openPopup={userLocationOpenPopup}
            setOpenPopup={setuserLocationOpenPopup}
          >
            <UserLocationForm recordForEdit={recordForEdit} userId={4} />
          </Popup>
          <Popup
            title="Add Employee Form"
            openPopup={addOpenPopup}
            setOpenPopup={setAddOpenPopup}
          >
            <AddEmployeeForm
              recordForEdit={recordForEdit}
              addEmployee={addEmployee}
              userType={userType}
              cacNumber={cacNumber}
              roles={users.roles}
            />
          </Popup>
          <Notification notify={notify} setNotify={setNotify} />
          <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
          />
        </Column>
      </div>
    );
}





function mapStateToProps(state) {
    return {
        buttonloader: state.utilityReducer.buttonloader,
        user: state.userReducer.user,
        cacNumber: state.userReducer.cacNumber,
        users: state.usersReducer.users,
        userType:state.userReducer.userType

    };
}
const mapDispatchToProps = (dispatch) => ({

    UpdateUser(payload) {
        dispatch({ type: "UPDATE_USER", payload });
    },

    LoadUsers(payload) {
        dispatch({ type: "LOAD_USERS", payload });
    },
    AddUser(payload) {
        dispatch({ type: "ADD_USER", payload });
    },

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Employees);