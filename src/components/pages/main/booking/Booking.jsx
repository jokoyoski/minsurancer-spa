import React, { useState, useEffect } from 'react'
import { Column, Row } from 'simple-flexbox';
import usePaginationTable from '../../../utilities/usePaginationTable';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../../../utilities/useTable";
import { ToastContainer } from 'react-toastify';
import StatComponent from '../../stat-page/StatComponent';
import Moment from 'react-moment';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from "react-redux";
import Controls from "../../../controls/Controls";
import Pagination from "../../../utilities/Pagination";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from "../../../utilities/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from "../../../utilities/Notification";
import ConfirmDialog from "../../../utilities/ConfirmDialog";
import BookingForm from './BookingForm';

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
    { id: 'platenumber', label: 'Plate Number' },
    { id: 'statusname', label: 'Status Name' },
    { id: 'servicename', label: 'Service Name' },
    { id: 'transactionstatus', label: 'Transaction Status' },
    { id: 'dte', label: 'Date Created' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export function Booking({ bookings, UpdateBooking, LoadBookings, statuses,
    currentPage, itemsPerPage, totalItems, totalPages }) {
    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [addOpenPopup, setAddOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const {
        TblContainer,
        TblHead,
        page,
    } = usePaginationTable(currentPage, itemsPerPage, totalItems, totalPages, bookings, headCells, filterFn);

    useEffect(() => {
        console.log(page)
        LoadBookings(page)
        return () => {

        }
    }, [page])


    /* const handleSearch = e => {
         let target = e.target;
         setFilterFn({
             fn: items => {
 
                 if (target.value === "")
                     return items;
                 else
                     return items.filter(x => x.ProductName.toLowerCase().includes(target.value))
             }
         })
     }*/






    const updateBooking = (booking, resetForm) => {
        var data = { ...booking }
        UpdateBooking(data)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }


    return (

        <div style={{ height: '700px' }}>
            <Column flexGrow={1}>
                <StatComponent />
                <ToastContainer />
                <Paper className={classes.pageContent}>
                    <h1>Bookings</h1>
                    <TblContainer>
                        <TblHead />
                        <TableBody>
                            {
                                bookings.map(item =>
                                (<TableRow key={item.id}>
                                    <TableCell>{item.plateNumber}</TableCell>
                                    <TableCell>{item.statusName}</TableCell>
                                    <TableCell>{item.serviceName}</TableCell>
                                    <TableCell>{item.transactionReference}</TableCell>
                                    <TableCell><Moment format="YYYY/MM/DD">{item.datecReated}</Moment></TableCell>
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
                            LoadBookings(value)
                        }}
                    />

                </Paper>
                <Popup
                    title="Booking Form"
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                ><BookingForm setOpenPopup={setOpenPopup} statuses={statuses} recordForEdit={recordForEdit} />
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
    console.log(state)
    return {
        currentPage: state.utilityReducer.currentPage,
        itemsPerPage: state.utilityReducer.itemsPerPage,
        totalItems: state.utilityReducer.totalItems,
        totalPages: state.utilityReducer.totalPages,
        buttonloader: state.utilityReducer.buttonloader,
        bookings: state.bookingReducer.bookings,
        statuses: state.bookingReducer.statuses
    };
}
const mapDispatchToProps = (dispatch) => ({

    UpdateBooking(payload) {
        dispatch({ type: "UPDATE_BOOKING", payload });
    },
    LoadBookings(payload) {
        dispatch({ type: "LOAD_BOOKING", payload });
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Booking);