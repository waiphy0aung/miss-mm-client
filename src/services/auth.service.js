import { toast } from "react-toastify";
import { saveUserDataAction } from "../actions/user.action";
import { Cookies } from "react-cookie";
import fetchUtilities from "../utilities/fetch.utility";
const cookie = new Cookies();

export const loginService = async (inputs,navigate, callback) => {
  const fetchResponse = await fetchUtilities.post({
    endpoint: '/auth/login',
    data: inputs
  })
  const { data, status } = fetchResponse;
  switch (status) {
    case 'success':
      saveUserDataAction(data.user);
      cookie.set('token', data.token);
      cookie.set('role', data.role);
      cookie.set('user', data.user);
      callback(undefined)
      navigate('/')
      break;
    case 'fail':
      callback(data);
      break;
    case 'error':
      toast.error(data);
      callback(undefined)
      break;
    default: break;
  }
}

export const registerService = async (inputs,navigate, callback) => {
  const fetchResponse = await fetchUtilities.post({
    endpoint: '/auth/register',
    data: inputs
  })
  const { data, status } = fetchResponse;
  switch (status) {
    case 'success':
      toast.success("Sign up success!")
      callback(undefined)
      navigate('/login')
      break;
    case 'fail':
      callback(data)
      break;
    case 'error':
      toast.error(data);
      callback(undefined)
      break;
    default: break;
  }
}

export const loginWithTokenService = async (navigate,callback) => {
  const fetchResponse = await fetchUtilities.get({
    endpoint: '/auth/login',
    headers: {xToken: cookie.get('token')}
  })
  const {data,status} = fetchResponse;
  switch(status){
    case 'success':
      saveUserDataAction(data.user);
      cookie.set('token',data.token);
      cookie.set('role',data.role);
      callback();
      navigate('/');
      break;
    case 'error':
      toast.error(data);
      callback()
      break;
    default: break;
  }
}
