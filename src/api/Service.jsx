import axios from 'axios';



const baseUrl = "https://localhost:5001/"
//const baseUrl="http://nanoreward-001-site2.etempurl.com/"


export function request(method, body, url) {
  var accessToken = null;
  var token = localStorage.getItem("access_token")
  if (token != 'undefined') {
    accessToken = JSON.parse(token)
  }
  let config = {
    method: method.toLowerCase(),
    url: url,
    baseURL: baseUrl,
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    data: body,
    validateStatus: function (status) {
      return status >= 200 && status < 400
    }
  }
  console.log(config)
  return new Promise(function (resolve, reject) {
    axios(config).then(
      function (response) {
        resolve(response.data)
      }
    ).catch(
      //  error
      function (error) {
        if (error === undefined) {
          reject(error)
        }
        reject(error)
      }
    )
  });

}



export function request2(method, body, url) {
  var bodyFormData = new FormData();
  bodyFormData.append('price', body.price);
  bodyFormData.append('productCategoryId', body.productCategoryId);
  bodyFormData.append('id', body.id);
  bodyFormData.append('productName', body.productName);
  //bodyFormData.append('price', body.price);
  //bodyFormData.append('price', body.price);
  var accessToken = null;
  var token = localStorage.getItem("access_token")
  if (token != 'undefined') {
    accessToken = JSON.parse(token)
  }
  let config = {
    method: method.toLowerCase(),
    url: url,
    baseURL: baseUrl,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data"

    },
    data: bodyFormData,
    validateStatus: function (status) {
      return status >= 200 && status < 400
    }
  }
  console.log(config)
  return new Promise(function (resolve, reject) {
    axios(config).then(
      function (response) {
        resolve(response.data)
      }
    ).catch(
      //  error
      function (error) {
        if (error === undefined) {
          reject(error)
        }
        reject(error)
      }
    )
  });

}



export default{
  request,request2
}
