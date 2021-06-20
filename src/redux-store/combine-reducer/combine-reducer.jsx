import { combineReducers } from "redux";
import UserReducer from "../reducers/user-reducer";
import UtilityReducer from "../reducers/utility-reducer";
import usersReducer from "../reducers/users-reducers";
import ProductCategoryReducer from "../reducers/product-category";
import ProductReducer from "../reducers/product/product";
import LocationReducer from "../reducers/location/location";
import SubscriptionReducer from "../reducers/subscription/subscription";
import OrderReducer from "../reducers/order/index";
import BookingReducer from "../reducers/booking/booking";
import ServiceReducer from "../reducers/service/service";
import TicketReducer from "../reducers/ticket"

const rootReducer = combineReducers({
  orderReducer: OrderReducer,
  userReducer: UserReducer,
  utilityReducer: UtilityReducer,
  usersReducer: usersReducer,
  productCategoryReducer: ProductCategoryReducer,
  productReducer: ProductReducer,
  locationReducer: LocationReducer,
  bookingReducer: BookingReducer,
  subscriptionReducer: SubscriptionReducer,
  serviceReducer: ServiceReducer,
  ticketReducer:TicketReducer
});

export default rootReducer;
