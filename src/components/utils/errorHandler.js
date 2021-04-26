const customErrorMessage = 'Request failed with an error. Refresh your browser or contact support';
const connectionErrorMessage = 'Connection error. Please ensure you have an active internet connection';

export const getErrorMessage = (payload) => {
  if (payload === undefined) {
    return "Network Error";
  }
  if (payload.status === 400) {
    var message = payload.data.errors[0]
    return message;
  }
  if (payload.status === 401) {
     message = payload.data.errors[0]
    return message;
  }
  if (payload.status === 500) {
    return "An Unexpected error occured, please try again later!!";
  }
  if (payload.response === undefined && payload.message) {
    return payload.message === 'Network Error' ? connectionErrorMessage : payload.message;
  }
  return customErrorMessage
}