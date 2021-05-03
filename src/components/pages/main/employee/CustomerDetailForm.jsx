import { store } from '../../../../redux-store/store';
import { request } from '../../../../api/Service';
import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import '../order/order-styles.scss';
export const CustomerDetailForm = (props) => {
    const { recordForEdit } = props
    var [vehicles, setVehicle] = useState([]);
    var total=0;
    useEffect(() => {
        store.dispatch({ type: "DISPLAY_LOADER" })
        console.log()
        request('get', {}, `vehicle/${recordForEdit.id}`).then(data => {
            vehicles = data;
            console.log(vehicles)
            setVehicle(vehicles)
            store.dispatch({ type: "DISPLAY_LOADER" })
        }
        )

    }, [])
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>Plate Number</th>
                        <th>Subscription Type</th>
                        <th>Status</th>
                        <th>Next Execution</th>
                        <th>Brand</th>
                        <th>Date Created</th>
                    </tr>
                    {
                            vehicles.map(vehicle => {
                                return (
                                    <tr key={vehicle.plateNumber}>
                                        <td>{vehicle.plateNumber}</td>
                                        <td>{vehicle.subscriptionName}</td>
                                        <td>{vehicle.statusName}</td>
                                       <td><Moment format="YYYY/MM/DD">{vehicle.nextExecution}</Moment></td> 
                                        <td>{vehicle.brand}</td>
                                        <td><Moment format="YYYY/MM/DD">{vehicle.dateCreated}</Moment></td>
                                    </tr>
                                )
                            })
                        
                    }
                </tbody>
            </table>
        </div >
    )
}
