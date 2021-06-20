export function addArticle(payload) {

  return { type: "ADD_ARTICLE", payload }
};

export function getData(url) {
  console.log(4)
  return { type: "DATA_REQUESTED", payload: { url } };
}


export function Login(payload) {
 
  return { type: "USER_DETAILS", payload: { payload } };
}


export function   LoadOrders (id) {
 console.log(id)
  return { type: "LOAD_ORDERS", payload: { id } };
}


export function   LoadTickets (id) {
  console.log(id)
   return { type: "LOAD_TICKETS", payload: { id } };
 }
export function   LoadBookings (id) {
  console.log(id)
   return { type: "LOAD_BOOKING", payload: { id } };
 }


export function   LoadUsers (cacNumber) {
 
  return { type: "LOAD_USERS", payload: { cacNumber } };
}
export function LoadLocations(id) {
 
  return { type: "LOAD_LOCATIONS", payload: { id } };
}


export function LoadProducts(companyId) {
 
  return { type: "LOAD_PRODUCT", payload: { companyId } };
}


export function LoadServices(id) {
 
  return { type: "LOAD_SERVICE", payload: { id } };
}


export function LoadProductCategory(id) {
 
  return { type: "LOAD_PRODUCT_CATEGORY", payload: { id } };
}


export function UpdateProductCategory(payload) {
 
  return { type: "UPDATE_PRODUCT_CATEGORY", payload: { payload } };
}


export function UpdateBooking(payload) {
 
  return { type: "UPDATE_BOOKING", payload: { payload } };
}


export function UpdateTicket(payload) {
 
  return { type: "UPDATE_TICKET", payload: { payload } };
}


export function ActivateProductCategory(id) {
 
  return { type: "ACTIVATE_PRODUCT_CATEGORY", payload: { id } };
}

export function DeleteProductCategory(id) {
 
  return { type: "DELETE_PRODUCT_CATEGORY", payload: { id } };
}


export function AddProductCategory(payload) {
 
  return { type: "ADD_PRODUCT_CATEGORY", payload: { payload } };
}


export function AddService(payload) {
 
  return { type: "ADD_SERVICE", payload: { payload } };
}

export function AddLocation(payload) {
 
  return { type: "ADD_LOCATION", payload: { payload } };
}

export function AddSubscription(payload) {
 
  return { type: "ADD_SUBSCRIPTION", payload: { payload } };
}



export function UpdateProduct(payload) {
 
  return { type: "UPDATE_PRODUCT", payload: { payload } };
}


export function UpdateService(payload) {
 
  return { type: "UPDATE_SERVICE", payload: { payload } };
}


export function UpdateLocation(payload) {
 
  return { type: "UPDATE_LOCATION", payload: { payload } };
}


export function UpdateSubscription(payload) {
 
  return { type: "UPDATE_SUBSCRIPTION", payload: { payload } };
}


export function DeleteProduct(id) {
  return { type: "DELETE_PRODUCT", payload: { id } };
}


export function DeleteService(id) {
  return { type: "DELETE_SERVICE", payload: { id } };
}


export function GetUsersLocation(payload) {
 
  return { type: "LOAD_USERS_LOCATION", payload: { payload } };
}


export function DeleteLocation(id) {
  return { type: "DELETE_LOCATION", payload: { id } };
}


export function DeleteSubscription(id) {
  return { type: "DELETE_SUBSCRIPTION", payload: { id } };
}


export function AddProductCategory(payload) {
 
  return { type: "ADD_PRODUCT_CATEGORY", payload: { payload } };
}


export function setLoading() {
  return { type: "DISPLAY_LOADER" };
}


export function TriggerLoginSucess() {
  return { type: "TRIGGER_LOGIN_SUCCESS" };
}
