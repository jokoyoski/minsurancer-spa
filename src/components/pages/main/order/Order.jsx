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
import {OrderForm} from './Orderform';
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
  { id: 'transactionReference', label: 'Transaction Referance' },
  { id: 'additonalIngo', label: 'Addtional Info' },
  { id: 'status', label: 'Status' },
  { id: 'accountNNumber', label: 'Account Number' },
  { id: 'actions', label: 'Actions', disableSorting: true }
];

export function Order({
  orders,
  LoadOrders,
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
    orders,
    headCells,
    filterFn
  );

  useEffect(() => {
    LoadOrders(1);
    return () => {};
  }, []);

  const openInPopup = item => {
    // setRecordForEdit(item)
    setOpenPopup(true);
  };

  return (
    <div
      style={{ overflowX: 'scroll', height: '700px', paddingBottom: '200px' }}>
      <Column flexGrow={1}>
        <StatComponent />
        <ToastContainer />
        <Paper className={classes.pageContent}>
          <Toolbar></Toolbar>
          <TblContainer>
            <TblHead />
            <TableBody>
              {orders.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.transactionReference}</TableCell>
                  <TableCell>{item.additionalInfo}</TableCell>
                  <TableCell>{item.statusName}</TableCell>
                  <TableCell>{item.accountNumber}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TblContainer>
          <Pagination
            count={totalItems}
            pageSize={10}
            fetchMethod={value => {
              LoadOrders(value);
            }}
          />
        </Paper>
        <Popup
          title='Product Category Form'
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}></Popup>
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
  console.log(state);
  return {
    currentPage: state.utilityReducer.currentPage,
    itemsPerPage: state.utilityReducer.itemsPerPage,
    totalItems: state.utilityReducer.totalItems,
    totalPages: state.utilityReducer.totalPages,
    orders: state.orderReducer.orders
  };
}
const mapDispatchToProps = dispatch => ({
  LoadOrders(payload) {
    dispatch({ type: 'LOAD_ORDERS', payload });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Order);
