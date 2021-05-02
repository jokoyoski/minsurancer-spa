import React, { useState, useEffect } from 'react';
import SubscriptionForm from './SubscriptionForm';
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
import useTable from '../../../utilities/useTable';
import { ToastContainer } from 'react-toastify';
import StatComponent from '../../stat-page/StatComponent';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import Controls from '../../../controls/Controls';
import Pagination from '../../../utilities/Pagination';
import { Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import Popup from '../../../utilities/Popup';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from '../../../utilities/Notification';
import ConfirmDialog from '../../../utilities/ConfirmDialog';
import AddSubscriptionForm from './AddSubscriptionForm';

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
  { id: 'name', label: 'Name' },
  { id: 'amount', label: 'Amount' },
  { id: 'isActive', label: 'Is Active' },
  { id: '', label: '' },
  { id: 'actions', label: 'Actions', disableSorting: true }
];

export function Subscription({
  subscriptions,
  Addsubscription,
  Loadsubscriptions,
  Updatesubscription,
  Deletesubscription,
  statuses,
  currentPage,
  itemsPerPage,
  totalItems,
  totalPages
}) {
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [filterFn, setFilterFn] = useState({
    fn: items => {
      return items;
    }
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [addOpenPopup, setAddOpenPopup] = useState(false);
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
    recordsAfterPagingAndSorting
  } = useTable(subscriptions, headCells, filterFn);

  useEffect(() => {
    Loadsubscriptions(1);
    return () => {};
  }, []);

  const handleSearch = e => {
    let target = e.target;
    setFilterFn({
      fn: items => {
        if (target.value === '') return items;
        else
          return items.filter(x =>
            x.firstName.toLowerCase().includes(target.value)
          );
      }
    });
  };

  const addOrEdit = (subscription, resetForm) => {
    if (subscription.id === 0) Addsubscription(subscription);
    else console.log(subscription);
    Updatesubscription(subscription);
    resetForm();
    setAddOpenPopup(false);
    setOpenPopup(false);
  };

  const addsubscription = (subscription, resetForm) => {
    Addsubscription(subscription);
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    setAddOpenPopup(false);
  };

  const openInPopup = item => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const onDelete = id => {
    Deletesubscription(id);
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    });
  };
  return (
    <div
      style={{ overflowX: 'scroll', height: '700px', paddingBottom: '200px' }}>
      <Column flexGrow={1}>
        <StatComponent />
        <ToastContainer />
        <div style={{ margin: '10px 0px 0px 80px', width: '95%' }}></div>
        <Paper className={classes.pageContent}>
          <Toolbar>
            <Controls.Button
              text='Add New'
              variant='outlined'
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
              {subscriptions.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.planName}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>{item.isActive.toString()}</TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <Controls.ActionButton
                      color='primary'
                      onClick={() => {
                        openInPopup(item);
                      }}>
                      <EditOutlinedIcon fontSize='small' />
                    </Controls.ActionButton>
                    <Controls.ActionButton
                      color='secondary'
                      onClick={() => {
                        setConfirmDialog({
                          isOpen: true,
                          title: 'Are you sure to delete this record?',
                          subTitle: "You can't undo this operation",
                          onConfirm: () => {
                            onDelete(item.id);
                          }
                        });
                      }}>
                      <CloseIcon fontSize='small' />
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
              Loadsubscriptions(value);
            }}
          />
        </Paper>
        <Popup
          title='Subscription Form'
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}>
          <SubscriptionForm
            recordForEdit={recordForEdit}
            addOrEdit={addOrEdit}
          />
        </Popup>

        <Popup
          title='Add Subscription Form'
          openPopup={addOpenPopup}
          setOpenPopup={setAddOpenPopup}>
          <AddSubscriptionForm
            recordForEdit={recordForEdit}
            addsubscription={addsubscription}
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
  console.log(state);
  return {
    currentPage: state.utilityReducer.currentPage,
    itemsPerPage: state.utilityReducer.itemsPerPage,
    totalItems: state.utilityReducer.totalItems,
    totalPages: state.utilityReducer.totalPages,
    buttonloader: state.utilityReducer.buttonloader,
    subscriptions: state.subscriptionReducer.subscriptions
  };
}
const mapDispatchToProps = dispatch => ({
  Updatesubscription(payload) {
    dispatch({ type: 'UPDATE_SUBSCRIPTION', payload });
  },

  Loadsubscriptions(payload) {
    dispatch({ type: 'LOAD_SUBSCRIPTIONS', payload });
  },
  Addsubscription(payload) {
    dispatch({ type: 'ADD_SUBSCRIPTION', payload });
  },

  Deletesubscription(payload) {
    dispatch({ type: 'DELETE_SUBSCRIPTION', payload });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Subscription);
