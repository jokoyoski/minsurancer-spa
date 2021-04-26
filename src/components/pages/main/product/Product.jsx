import React, { useState, useEffect } from 'react'
import ProductForm from "./ProductForm";
import { Column, Row } from 'simple-flexbox';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../../../utilities/useTable";
import { ToastContainer } from 'react-toastify';
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
import AddProductForm from './AddProductForm';

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
    { id: 'productName', label: 'Product Name' },
    { id: 'productDescription', label: 'Product DescriptionD' },
    { id: 'categoryName', label: 'Category Name' },
    { id: 'status', label: 'Status' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export function Product({ products, UpdateProduct, DeleteProduct,LoadProducts, companyId, AddProduct, categories }) {


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
    } = useTable(products, headCells, filterFn);

    useEffect(() => {
        LoadProducts(companyId)
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
                    return items.filter(x => x.ProductName.toLowerCase().includes(target.value))
            }
        })
    }

    const addOrEdit = (product, resetForm) => {
        if (product.id === 0)
            AddProduct(product)
        else
            var data = { ...product, 'companyId': companyId }
        UpdateProduct(data)
        resetForm()
        // setRecordForEdit(null)
        setOpenPopup(false)
        
    }




    const addProduct = (product, resetForm) => {
        var data = { ...product, 'companyId': companyId }
        AddProduct(data)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const onDelete = id => {
        DeleteProduct(id)
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
    }
    return (

        <div style={{ overflowX: 'scroll', height: '700px' }}>
            <Column flexGrow={1}>
                <StatComponent />
                <ToastContainer />
                <div style={{ margin: '10px 0px 0px 80px', width: '95%', }}>
                    <Controls.Input
                        label="Search Products"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
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
                            onClick={() => { setAddOpenPopup(true); setRecordForEdit(null); }}
                        />
                    </Toolbar>
                    <TblContainer>
                        <TblHead />
                        <TableBody>
                            {

                                recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.id}>
                                    <TableCell>{item.productName}</TableCell>
                                    <TableCell>{item.productDescription}</TableCell>
                                    <TableCell>{item.categoryName}</TableCell>
                                    <TableCell>{item.isActive.toString()}</TableCell>
                                    <TableCell>
                                        <Controls.ActionButton
                                            color="primary"
                                            onClick={() => {
                                                openInPopup(item)
                                            }}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
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
                    <TblPagination />
                </Paper>
                <Popup
                    title="Product Form"
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >
                    <ProductForm
                        recordForEdit={recordForEdit}
                        addOrEdit={addOrEdit}
                        categories={categories} />
                </Popup>

                <Popup
                    title="Add Product Form"
                    openPopup={addOpenPopup}
                    setOpenPopup={setAddOpenPopup}
                >

                    <AddProductForm
                        recordForEdit={recordForEdit}
                        addOrEdit={addProduct}
                        categories={categories} />
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
        products: state.productReducer.products,
        companyId:state.userReducer.companyId,
        categories: state.productReducer.categories,
    };
}
const mapDispatchToProps = (dispatch) => ({

    UpdateProduct(payload) {
        dispatch({ type: "UPDATE_PRODUCT", payload });
    },

    AddProduct(payload) {
        dispatch({ type: "ADD_PRODUCT", payload });
    },


    LoadProducts(payload) {
        dispatch({ type: "LOAD_PRODUCT", payload });
    },

    DeleteProduct(payload) {
        dispatch({ type: "DELETE_PRODUCT", payload });
    },


})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Product);