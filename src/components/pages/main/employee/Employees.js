
  
import React, { useState, useEffect } from 'react'
import EmployeeForm from "./EmployeeForm";
import { Column, Row } from 'simple-flexbox';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import './employee.styles.scss';
import useTable from "../../../utilities/useTable";
import Pagination from "../../../utilities/Pagination";
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

export function Employees({ users, roles, UpdateUser, LoadUsers, cacNumber, AddUser , currentPage, itemsPerPage, totalItems, totalPages}) {

 console.log(roles)
    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [addOpenPopup, setAddOpenPopup] = useState(false)
    const [userLocationOpenPopup, setuserLocationOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable([], headCells, filterFn);

    useEffect(() => {
      var data={
        pageNumber:1,
        userType:'Admin',
        searchTerm:''
      }
        LoadUsers(data)
        return () => {

        }
    }, [])

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
        setOpenPopup(false)
        setNotify({
            isOpen: true,
            message: 'Submitted Successfully',
            type: 'success'
        })
    }




    const addEmployee = (employee, resetForm) => {
      var data={...employee,password:employee.email,confirmPassword:employee.email}
        AddUser(data)
        resetForm()
        setRecordForEdit(null)
        setAddOpenPopup(false)
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

        <div style={{ height: '700px' }}>
            <Column flexGrow={1}>
                <StatComponent />
                <ToastContainer />
                <Paper className={classes.pageContent}>
                    <Toolbar>
                        <Controls.Button
                            text="Add New"
                            variant="outlined"
                            startIcon={<AddIcon />}
                            className={classes.newButton}
                            onClick={() => { setAddOpenPopup(true); setRecordForEdit(null); }}
                        />
                    </Toolbar>
                    <TblContainer>
                        <TblHead />
                        <TableBody>
                            {

                              users.map(item =>
                                (<TableRow key={item.id}>
                                    <TableCell>{item.firstName}</TableCell>
                                    <TableCell>{item.lastName}</TableCell>
                                    <TableCell>{item.phoneNumber}</TableCell>
                                    <TableCell>
                                        <Controls.ActionButton
                                            color="primary"
                                            onClick={() => {
                                                openInPopup(item)
                                            }}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
                                    </TableCell>
                                </TableRow>)
                                )
                            }
                        </TableBody>
                    </TblContainer>
                    <Pagination
                        count={totalItems}
                        pageSize={10}
                        fetchMethod={(value) => {
                          var data={
                            pageNumber:value,
                            userType:'Admin',
                            searchTerm:''
                          }
                            LoadUsers(data)
                        }}
                    />
                    
                </Paper>
                <Popup
                    title="Employee Form"
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >
                    <EmployeeForm
                        recordForEdit={recordForEdit}
                        roles={roles}
                        addOrEdit={addOrEdit}
                        setAddOpenPopup={setAddOpenPopup}
                      setOpenPopup={setOpenPopup}
                         />
                </Popup>

                <Popup
                    title="Update User Location"
                    openPopup={userLocationOpenPopup}
                    setOpenPopup={setuserLocationOpenPopup}
                >

                    <UserLocationForm
                        recordForEdit={recordForEdit}
                        userId={4}
                       />
                </Popup>
                <Popup
                    title="Employee Form"
                    openPopup={addOpenPopup}
                    setOpenPopup={setAddOpenPopup}
                      setOpenPopup={setOpenPopup}
                >

                    <AddEmployeeForm
                        recordForEdit={recordForEdit}
                         addEmployee={addEmployee}
                         roles={roles}
                        setOpenPopup={setOpenPopup}
                        setAddOpenPopup={setAddOpenPopup}
                        cacNumber={cacNumber}
                      />
                </Popup>
                <Notification
                    notify={notify}
                    setNotify={setNotify}
                />
                <ConfirmDialog
                    confirmDialog={confirmDialog}
                    setConfirmDialog={setConfirmDialog}
                />
            </Column>

        </div>

    )
}





function mapStateToProps(state) {
    return {
        buttonloader: state.utilityReducer.buttonloader,
        user: state.userReducer.user,
        cacNumber: state.userReducer.cacNumber,
        users: state.usersReducer.users,
        currentPage: state.utilityReducer.currentPage,
        itemsPerPage: state.utilityReducer.itemsPerPage,
        totalItems: state.utilityReducer.totalItems,
        totalPages: state.utilityReducer.totalPages,
        userType:state.userReducer.userType,
        roles:state.usersReducer.roles

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
