import React, { useState, useEffect } from 'react'
import LocationForm from "./LocationForm";
import { Column, Row } from 'simple-flexbox';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../../../utilities/useTable";
import { ToastContainer } from 'react-toastify';
import StatComponent from '../../stat-page/StatComponent';
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
import AddLocationForm from './AddLocationForm';

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
    { id: 'name', label: 'Name' },
    { id: 'isActive', label: 'Is Active' },
    { id: '', label: '' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export function Locations({ locations, AddLocation, LoadLocations,UpdateLocation,DeleteLocation,statuses,
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
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(locations, headCells, filterFn);

    useEffect(() => {
        LoadLocations(1)
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

    const addOrEdit = (Location, resetForm) => {
        if (Location.id === 0)
            AddLocation(Location)
        else
        UpdateLocation(Location)
        resetForm()
        setAddOpenPopup(false)
        setOpenPopup(false)
    }




    const addLocation = (Location, resetForm) => {
        AddLocation(Location)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setAddOpenPopup(false)
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const onDelete = id => {
        DeleteLocation(id)
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
    }
    return (

        <div style={{  height: '700px' }}>
            <Column flexGrow={1}>
                <StatComponent />
                <ToastContainer />
                <div style={{ margin: '10px 0px 0px 80px', width: '95%', }}>
                </div>
                <Paper className={classes.pageContent}>
                    <h2>Location</h2>
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

                                locations.map(item =>
                                (<TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.isActive.toString()}</TableCell>
                                    <TableCell><Controls.ActionButton
                                            color="primary"
                                            onClick={() => {
                                                openInPopup(item)
                                            }}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton></TableCell>
                                   
                                    <TableCell>
                                        <Controls.ActionButton
                                            color="secondary"
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Are you sure to delete this record?',
                                                    subTitle: "You can't undo this operation",
                                                    onConfirm: () => { onDelete(item.id) }
                                                })
                                            }}>
                                            <CloseIcon fontSize="small" />
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
                            LoadLocations(value)
                        }}
                    />
                </Paper>
                <Popup
                    title="Location Form"
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >
                    <LocationForm
                        recordForEdit={recordForEdit}
                        addOrEdit={addOrEdit}
                    />
                </Popup>

                <Popup
                    title="Add Location Form"
                    openPopup={addOpenPopup}
                    setOpenPopup={setAddOpenPopup}
                >

                    <AddLocationForm
                        recordForEdit={recordForEdit}
                        addLocation={addLocation}
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
        currentPage: state.utilityReducer.currentPage,
        itemsPerPage: state.utilityReducer.itemsPerPage,
        totalItems: state.utilityReducer.totalItems,
        totalPages: state.utilityReducer.totalPages,
        buttonloader: state.utilityReducer.buttonloader,
        locations: state.locationReducer.locations,

    };
}
const mapDispatchToProps = (dispatch) => ({

    UpdateLocation(payload) {
        dispatch({ type: "UPDATE_LOCATION", payload });
    },

    LoadLocations(payload) {
        dispatch({ type: "LOAD_LOCATIONS", payload });
    },
    AddLocation(payload) {
        dispatch({ type: "ADD_LOCATION", payload });
    },


    DeleteLocation(payload) {
        dispatch({ type: "DELETE_LOCATION", payload });
    },

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Locations);