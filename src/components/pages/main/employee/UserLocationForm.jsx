import React, { useEffect, useState } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../../controls/Controls";
import { Form } from '../../../controls/useForm';
//import { Multiselect } from 'multiselect-react-dropdown';
import { request } from '../../../../api/Service'
import { store } from '../../../../redux-store/store';





export function UserLocationForm(props) {
   /* const { utilityReducer } = store.getState();
    const [userLocations, setUserLocations] = useState([]);
    const [usernewLocation, setnewUserLocation] = useState({});
    const [companyLocations, setCompanyLocations] = useState([]);
    const { userId, companyId, recordForEdit } = props




    function onSelect(e) {
        setnewUserLocation(e)
    }

    function onRemove(e) {
        setnewUserLocation(e)
    }

    const handleSubmit = e => {
        e.preventDefault()
       
        var data = {
            userId: recordForEdit.id,
            locations: usernewLocation
            
        }
        store.dispatch({ type: "LOADING_BUTTON_SPINNER" })
        request('post', data, `user-location`).then(data => {
        }
        )
        store.dispatch({ type: "LOADING_BUTTON_SPINNER" })
    }

    useEffect(() => {
        request('get', {}, `user-locations-multi-select/${recordForEdit.id}?companyId=${localStorage.getItem("companyId")}`).then(data => {
            setUserLocations(data.userLocations)
            setCompanyLocations(data.companyLocations)
            setnewUserLocation(data.userLocations)
        }
        )

    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Multiselect
                        options={companyLocations} // Options to display in the dropdown
                        selectedValues={userLocations} // Preselected value to persist in dropdown
                        onSelect={onSelect} // Function will trigger on select event
                        onRemove={onRemove} // Function will trigger on remove event
                        displayValue="name" // Property name to display in the dropdown options
                    />
                </Grid>

            </Grid>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <button type='submit' style={{ background: '#333996' }} className='save-button'>Save & Continue <i className={utilityReducer.buttonloader === true ? "fa fa-spinner fa-spin" : ''}></i></button>
            </div>
        </Form>
    )
}




function mapStateToProps(state) {
    return {
        buttonloader: state.utilityReducer.buttonloader,
        companyLocations: state.userReducer.companyLocations,
        userLocations: state.usersReducer.userLocations,
    };
}
const mapDispatchToProps = (dispatch) => ({

    LoadUserLocation(payload) {
        dispatch({ type: "LOAD_USER_LOCATIONS", payload });
    },
    AddUser(payload) {
        dispatch({ type: "ADD_USER", payload });
    },

})*/
}
export default UserLocationForm