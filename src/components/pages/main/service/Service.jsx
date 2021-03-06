import React, { useState, useEffect } from 'react';
import ServiceForm from './ServiceForm';
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
import usePaginationTable from '../../../utilities/usePaginationTable';
import Pagination from '../../../utilities/Pagination';
import StatComponent from '../../stat-page/StatComponent';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import Controls from '../../../controls/Controls';
import { Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import Popup from '../../../utilities/Popup';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from '../../../utilities/Notification';
import ConfirmDialog from '../../../utilities/ConfirmDialog';
import AddServiceForm from './AddServiceForm';

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
  { id: 'service', label: 'Subscription Name' },
  { id: 'ServiceName', label: 'Service Name' },
  { id: 'status', label: 'Status' },
  { id: 'actions', label: 'Actions', disableSorting: true }
];

export function Service({
  services,
  UpdateService,
  DeleteService,
  LoadServices,
  AddService,
  subscriptions,
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
  const { TblContainer, TblHead, page } = usePaginationTable(
    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,
    services,
    headCells,
    filterFn
  );

  useEffect(() => {
    LoadServices(page);
    return () => {};
  }, [page]);

  const handleSearch = e => {
    let target = e.target;
    setFilterFn({
      fn: items => {
        if (target.value === '') return items;
        else
          return items.filter(x =>
            x.ProductName.toLowerCase().includes(target.value)
          );
      }
    });
  };

  const addOrEdit = (service, resetForm) => {
    if (service.id === 0) AddService(service);
    else console.log(service);
    UpdateService(service);
    resetForm();
    // setRecordForEdit(null)
    setOpenPopup(false);
  };

  const addService = (service, resetForm) => {
    AddService(service);
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
  };

  const openInPopup = item => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const onDelete = id => {
    DeleteService(id);
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
          <h1>Services</h1>
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
              {services.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.planName}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.isActive.toString()}</TableCell>
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
              LoadServices(value);
            }}
          />
        </Paper>
        <Popup
          title='Service Form'
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}>
          <ServiceForm
            recordForEdit={recordForEdit}
            addOrEdit={addOrEdit}
            subscriptions={subscriptions}
          />
        </Popup>

        <Popup
          title='Add Service Form'
          openPopup={addOpenPopup}
          setOpenPopup={setAddOpenPopup}>
          <AddServiceForm
            recordForEdit={recordForEdit}
            addOrEdit={addService}
            subscriptions={subscriptions}
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
    buttonloader: state.utilityReducer.buttonloader,
    services: state.serviceReducer.services,
    subscriptions: state.serviceReducer.subscriptions,
    currentPage: state.utilityReducer.currentPage,
    itemsPerPage: state.utilityReducer.itemsPerPage,
    totalItems: state.utilityReducer.totalItems,
    totalPages: state.utilityReducer.totalPages
  };
}
const mapDispatchToProps = dispatch => ({
  UpdateService(payload) {
    dispatch({ type: 'UPDATE_SERVICE', payload });
  },

  AddService(payload) {
    dispatch({ type: 'ADD_SERVICE', payload });
  },

  LoadServices(payload) {
    dispatch({ type: 'LOAD_SERVICE', payload });
  },

  DeleteService(payload) {
    dispatch({ type: 'DELETE_SERVICE', payload });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Service);
