import { toast } from "react-toastify";
import { addMissAction, deleteMissAction, saveMissDataAction, updateMissAction } from "../actions/miss.action";
import fetchUtilities from "../utilities/fetch.utility"
import { Cookies } from "react-cookie"
const cookie = new Cookies;

export const getMissesService = async () => {
  const fetchResponse = await fetchUtilities.get({
    endpoint: '/misses/',
    headers: { xToken: cookie.get('token') }
  })

  const { status, data } = fetchResponse;
  switch (status) {
    case 'success':
      saveMissDataAction(data);
      break;
    case 'error':
      toast.error(data);
      break;
    default:
      break;
  }
}

export const createMissService = async (inputs,callback) => {
  const fetchResponse = await fetchUtilities.post({
    endpoint: '/misses/create',
    data: inputs,
    headers: { xToken: cookie.get('token') },
    isFormData: true
  })

  const { status, data } = fetchResponse;
  switch (status) {
    case 'success':
      addMissAction(data);
      toast.success('Created successfully');
      callback(undefined);
      break;
    case 'fail':
      callback(data);
      break;
    case 'error':
      toast.error(data);
      callback(undefined)
      break;
    default:
      callback(undefined)
      break;
  }
}

export const updateCategoryService = async (inputs,callback) => {
  const fetchResponse = await fetchUtilities.put({
    endpoint: '/misses/update/'+inputs._id,
    data: inputs,
    headers: { xToken: cookie.get('token') }
  })

  const { status, data } = fetchResponse;
  switch (status) {
    case 'success':
      updateMissAction(data);
      toast.success('Updated successfully');
      callback(undefined);
      break;
    case 'fail':
      callback(data);
      break;
    case 'error':
      toast.error(data);
      callback(undefined)
      break;
    default:
      callback(undefined)
      break;
  }
}

export const deleteCategoryService = async (id,callback) => {
  const fetchResponse = await fetchUtilities.delete({
    endpoint: '/misses/delete/'+id,
    headers: { xToken: cookie.get('token') }
  })

  const { status, data } = fetchResponse;
  switch (status) {
    case 'success':
      deleteMissAction(data);
      toast.success('Deleted successfully');
      callback(undefined);
      break;
    case 'error':
      toast.error(data);
      callback(undefined)
      break;
    default:
      callback(undefined)
      break;
  }
}
