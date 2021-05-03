import { store } from '../../../../redux-store/store';
import { request } from '../../../../api/Service';
import React, { useEffect, useState } from 'react';
import './order-styles.scss';
export const OrderForm = (props) => {
    const { recordForEdit } = props
    var [orders, setOrders] = useState([]);
    var total=0;
    useEffect(() => {
        store.dispatch({ type: "DISPLAY_LOADER" })
        console.log()
        request('get', {}, `api/Order/get-order-histories?transactionRefernce=${recordForEdit.transactionReference}`).then(data => {
            orders = data;
            console.log(orders)
            setOrders(orders)
            store.dispatch({ type: "DISPLAY_LOADER" })
        }
        )

    }, [])
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Quantity</th>
                    </tr>
                    {
                            orders.map(record => {
                               total+=record.amount*record.quantity
                                return (
                                    <tr key={record.productName}>
                                        <td>{record.productName}</td>
                                        <td>₦{record.amount}</td>
                                        <td>{record.quantity}</td>
                                    </tr>
                                )
                            })
                        
                    }

                 Total: ₦{total}
                </tbody>
            </table>
        </div >
    )
}
