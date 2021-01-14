import { session } from '@/store/loginStore.js'
import axios from 'axios'
import Toast from '@/utils/toast.js'
const toast = new Toast({duration:2000})  
let authorization = null;
session.subscribe($session=>{
  authorization = $session?$session.token:null
})
//const APIHOSTNAME = "http://localhost:3001/api/v2/"
const APIHOSTNAME  = window.APIHOSTNAME = 'process.env.APIHOSTNAME' // will be replaced from .env with rollup

function showErrorNotification(responseData){
  let msg_array = []
  if (responseData && responseData.message) msg_array.push(responseData.message)
  if (responseData && responseData.error && Array.isArray(responseData.error)) 
    responseData.error.forEach((e,i)=>{
      msg_array.push( e.stack )
    }); 
  toast.error(msg_array.join('\n'))
}

export const fetch2 = window.fetch2 = function(method, url, obj){
  //console.log('params', obj)
  return axios({
    method: method || 'post',
    url: APIHOSTNAME+url,
    data: method=='get'?null:obj,
    params: method=='get'?obj:null,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...(authorization? {"authorization":'Bearer '+ authorization}:{})
    },
  })
  .then(function (response) {
      //return [response.data,null]
      if (response.data && response.data.errorCode){
        showErrorNotification(response.data)
        return([null,response.data])
      }
      else
        return([response.data,null]) 


  })
  .catch(function (error) {
    if (error.response && error.response.data && error.response.data.errorCode)
      showErrorNotification(error.response.data)
    return [null,error]
  });
}
