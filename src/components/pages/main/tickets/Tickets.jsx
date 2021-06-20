import React, { useState, useEffect } from 'react';
import { Column, Row } from 'simple-flexbox';
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment
} from '@material-ui/core';
import usePaginationTable from '../../../utilities/usePaginationTable';
import Controls from '../../../controls/Controls';
import { ToastContainer } from 'react-toastify';
import StatComponent from '../../stat-page/StatComponent';
import Pagination from '../../../utilities/Pagination';
import 'react-toastify/dist/ReactToastify.css';
import Moment from 'react-moment';
import { connect } from "react-redux";
import Popup from "../../../utilities/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import TicketForm  from './TicketForm.jsx';
import Notification from "../../../utilities/Notification";
import ConfirmDialog from "../../../utilities/ConfirmDialog";

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
}));

const headCells = [
  { id: 'firstName', label: 'First Name' },
  { id: 'additonalIngo', label: 'Last Name' },
  { id: 'status', label: 'Ticket Type' },
  { id: 'accountNNumber', label: 'Date Created' },
    { id: 'u', label: 'Priority' },
 
  { id: 'actions', label: 'Actions', disableSorting: true }
];

export function Tickets({
  tickets,
  priorities,
  LoadTickets,
  currentPage,
  itemsPerPage,
  totalItems,
  totalPages
}) {
  const classes = useStyles();
  const [filterFn, setFilterFn] = useState({
    fn: items => {
      return items;
    }
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: ''
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: ''
  });
  const {
    TblContainer,
    TblHead,
    TblPagination,
    page,
    pages,
    rowsPerPage,
    recordsAfterPagingAndSorting
  } = usePaginationTable(
    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,
    tickets,
    headCells,
    filterFn
  );

  useEffect(() => {
    LoadTickets(1);
    return () => { };
  }, []);

  const openInPopup = item => {
    setRecordForEdit(item)
    setOpenPopup(true);
  };

  return (
    <div
      style={{ overflowX: 'scroll', height: '700px', paddingBottom: '200px' }}>
      <Column flexGrow={1}>
        <StatComponent />
        <ToastContainer />
        <Paper className={classes.pageContent}>
          <h1>Tickets</h1>
          <Toolbar></Toolbar>
          <TblContainer>
            <TblHead />
            <TableBody>
              {tickets.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.firstName}</TableCell>
                  <TableCell>{item.lastName}</TableCell>
                  <TableCell>{item.name}</TableCell>
                    <TableCell><Moment format="YYYY/MM/DD">{item.datecReated}</Moment></TableCell>
                  <TableCell>{item.priorityName}</TableCell>
                  <TableCell>
                    <Controls.ActionButton
                      color="primary"
                      onClick={() => {
                        openInPopup(item)
                      }}>
                      <EditOutlinedIcon fontSize="small" />
                    </Controls.ActionButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TblContainer>
          <Pagination
            count={totalItems}
            pageSize={10}
            fetchMethod={value => {
              LoadTickets(value);
            }}
          />
        </Paper>
        <Popup
          title='Ticket Form'
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}>
          <TicketForm
            recordForEdit={recordForEdit}
            priorities={priorities}
            setOpenPopup={setOpenPopup}
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
    currentPage: state.utilityReducer.currentPage,
    itemsPerPage: state.utilityReducer.itemsPerPage,
    totalItems: state.utilityReducer.totalItems,
    totalPages: state.utilityReducer.totalPages,
    tickets: state.ticketReducer.tickets,
    priorities: state.ticketReducer.priorities,
    ticketTypes: state.ticketReducer.ticketTypes
  };
}
const mapDispatchToProps = dispatch => ({
  LoadTickets(payload) {
    dispatch({ type: 'LOAD_TICKETS', payload });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Tickets);
