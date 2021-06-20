import watcherLoginSaga from '../redux-store/sagas/login-sagas';
import watcherRegisterSaga from '../redux-store/sagas/register-saga';
import watcherCompanySaga from '../redux-store/sagas/add-company-saga';
import watcherUpdateUserSaga from './sagas/users/update-user-saga';
import watcherGetUsersSaga from './sagas/users/users-sagas';
import watcherAddUserSaga from './sagas/users/add-user-saga';
import watcherGetProductCategoriesSaga from './sagas/product-category/product-category.saga';
import watcherAddProductCategorySaga from './sagas/product-category/add-product-category';
import watcherUpdateProductCategorySaga from './sagas/product-category/update-product-category';
import watcherDeleteProductCategorySaga from './sagas/product-category/delete-product-category';
import watcherAddProductSaga from '../redux-store/sagas/product/add-product.saga'
import watcherDeleteProduct from '../redux-store/sagas/product/delete-product'
import watcherUpdateProduct from '../redux-store/sagas/product/update-product.saga'
import watcherGetProductsSaga from '../redux-store/sagas/product/product-saga'
import watcherAddLocationSaga from '../redux-store/sagas/location/add-location.saga'
import watcherGetUserLocationsSaga from '../redux-store/sagas/location/location-saga'
import watcherDeleteLocation from '../redux-store/sagas/location/delete-location-saga'
import watcherUpdateLocationSaga from '../redux-store/sagas/location/update-location-saga'
import watcherGetLocationsSaga from '../redux-store/sagas/location/location-saga'
import watcherGetOrdersSaga from '../redux-store/sagas/order/order-saga';
import watcherUpdateBookingSaga from '../redux-store/sagas/booking/update-booking-saga'
import waterGetBookingSaga from '../redux-store/sagas/booking/booking-saga'
import watcherAddSubscriptionSaga from '../redux-store/sagas/subscription/add-subscription-saga'
import watcherDeleteSubscription   from '../redux-store/sagas/subscription/delete-subscription-saga'
import watcherUpdateSubscriptionSaga from '../redux-store/sagas/subscription/update-subscription-saga'
import watcherGetSubscriptionsSaga from '../redux-store/sagas/subscription/subscription-saga'
import watcherAddServiceSaga from '../redux-store/sagas/service/add-service-saga'
import watcherDeleteServiceSaga   from '../redux-store/sagas/service/delete-service-saga'
import watcherUpdateServiceSaga from '../redux-store/sagas/service/update-service-saga'
import watcherGetServicesSaga from '../redux-store/sagas/service/service-saga'
import watcherGetTicketsSaga from '../redux-store/sagas/tickets/ticket-saga'
import watcherUpdateTicketSaga from '../redux-store/sagas/tickets/update-ticket-saga'


export const UiSagas = [

  watcherLoginSaga(),
  watcherRegisterSaga(),
  watcherCompanySaga(),
  watcherUpdateUserSaga(),
  watcherAddUserSaga(),
  watcherGetUsersSaga(),
  watcherGetProductCategoriesSaga(),
  watcherAddProductCategorySaga(),
  watcherUpdateProductCategorySaga(),
  watcherDeleteProductCategorySaga(),
  watcherGetProductsSaga(),
  watcherAddProductSaga(),
  watcherDeleteProduct(),
  watcherUpdateProduct(),
  watcherAddLocationSaga(),
  watcherDeleteLocation(),
  watcherGetLocationsSaga(),
  watcherUpdateLocationSaga(),
  watcherGetUserLocationsSaga(),
  watcherGetOrdersSaga(),
  waterGetBookingSaga(),
  watcherUpdateBookingSaga(),
  watcherAddSubscriptionSaga(),
  watcherGetSubscriptionsSaga(),
  watcherDeleteSubscription(),
  watcherUpdateSubscriptionSaga(),
  watcherAddServiceSaga(),
  watcherGetServicesSaga(),
  watcherDeleteServiceSaga(),
  watcherUpdateServiceSaga(),
  watcherGetTicketsSaga(),
  watcherUpdateTicketSaga()


]