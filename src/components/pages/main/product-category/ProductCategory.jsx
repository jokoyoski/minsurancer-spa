import React, { useState, useEffect } from 'react';
import ProductCategoryForm from './ProductCategoryForm';
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
import './product-category.styles.scss';
import usePaginationTable from '../../../utilities/usePaginationTable';
import Pagination from '../../../utilities/Pagination';
import { ToastContainer } from 'react-toastify';
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
import AddProductCategoryForm from './AddProductCategoryForm';

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
  { id: 'description', label: 'Description' },
  { id: 'status', label: 'Status' },
  { id: 'actions', label: 'Actions', disableSorting: true }
];

export function ProductCategory({
  categories,
  UpdateProductCategory,
  AddProductCategory,
  LoadProductCategory,
  DeleteProductCategory,
  companyId,
  currentPage,
  itemsPerPage,
  totalItems,
  totalPages
}) {
  console.log('initializing ...');
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
  console.log('about to call use table ...');
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
    categories,
    headCells,
    filterFn
  );
  useEffect(() => {
    var data = {
      page: 1
    };
    LoadProductCategory(1);
    return () => {};
  }, [page]);

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

  const addOrEdit = (productCategory, resetForm) => {
    var data = { ...productCategory, companyId: companyId };
    UpdateProductCategory(data);
    setOpenPopup(false);
    setAddOpenPopup(false);
    resetForm();
  };

  const addProductCategory = (productCategory, resetForm) => {
    var data = { ...productCategory, companyId: companyId };
    AddProductCategory(data);
    setOpenPopup(false);
    setAddOpenPopup(false);
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
  };

  const openInPopup = item => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const onDelete = id => {
    console.log(id);
    DeleteProductCategory(id);
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    });
  };
  return (
    <div
      style={{ overflowX: 'scroll', height: '700px', paddingBottom: '200px' }}>
      {console.log('i dey inside return')}
      <Column flexGrow={1}>
        <StatComponent />
        <ToastContainer />
        <Paper className={classes.pageContent}>
        <h1>Product Category</h1>
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
              {categories.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
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
              LoadProductCategory(value);
            }}
          />
        </Paper>
        <Popup
          title='Product Category Form'
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}>
          <ProductCategoryForm
            recordForEdit={recordForEdit}
            addOrEdit={addOrEdit}
          />
        </Popup>

        <Popup
          title='Add Product Category Form'
          openPopup={addOpenPopup}
          setOpenPopup={setAddOpenPopup}>
          <AddProductCategoryForm
            recordForEdit={recordForEdit}
            addProductCategory={addProductCategory}
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
    categories: state.productCategoryReducer.productCategories,
    companyId: state.userReducer.companyId
  };
}
const mapDispatchToProps = dispatch => ({
  UpdateProductCategory(payload) {
    dispatch({ type: 'UPDATE_PRODUCT_CATEGORY', payload });
  },

  AddProductCategory(payload) {
    dispatch({ type: 'ADD_PRODUCT_CATEGORY', payload });
  },

  LoadProductCategory(payload) {
    dispatch({ type: 'LOAD_PRODUCT_CATEGORY', payload });
  },

  DeleteProductCategory(payload) {
    dispatch({ type: 'DELETE_PRODUCT_CATEGORY', payload });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategory);
