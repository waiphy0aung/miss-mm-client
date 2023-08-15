import { toast } from "react-toastify";
import { addCategoryDataAction, deleteCategoryAction, saveCategoryDataAction, updateCategoryAction } from "../actions/category.action";
import fetchUtilities from "../utilities/fetch.utility"
import { Cookies } from "react-cookie"
const cookie = new Cookies();

export const getCategoriesServices = async () => {
  const fetchResponse = await fetchUtilities.get({
    endpoint: '/categories/',
    headers: { xToken: cookie.get('token') }
  })
  const { status, data } = fetchResponse;
  switch (status) {
    case 'success':
      saveCategoryDataAction(data);
      break;
    case 'error':
      toast.error(data);
      break;
    default:
      break;
  }
}

export const addCategoryService = async (inputs, callback) => {
  const fetchResponse = await fetchUtilities.post({
    endpoint: '/categories/create',
    data: inputs,
    headers: { xToken: cookie.get('token') }
  })

  const { status, data } = fetchResponse;
  switch (status) {
    case 'success':
      addCategoryDataAction(data);
      toast.success('Added successfully!');
      callback(undefined)
      break;
    case 'fail':
      callback(data);
      break;
    case 'error':
      toast.error(data);
      callback(undefined);
      break;
    default:
      callback(undefined);
      break;
  }
}

export const updateCategoryService = async (id, inputs, callback) => {
  console.log(id,inputs)
  const fetchResponse = await fetchUtilities.put({
    endpoint: '/categories/update/' + id,
    data: inputs,
    headers: { xToken: cookie.get('token') }
  })

  const { status, data } = fetchResponse;
  switch (status) {
    case 'success':
      updateCategoryAction(data);
      toast.success('Updated successfully!');
      callback(undefined)
      break;
    case 'fail':
      callback(data);
      break;
    case 'error':
      toast.error(data);
      callback(undefined);
      break;
    default:
      callback(undefined);
      break;
  }
}

export const deleteCategoryService = async (id) => {
  const fetchResponse = await fetchUtilities.delete({
    endpoint: '/categories/delete/' + id,
    headers: { xToken: cookie.get('token') }
  })

  const { status, data } = fetchResponse;
  switch (status) {
    case 'success':
      deleteCategoryAction(id);
      toast.success('Deleted successfully!');
      break;
    case 'error':
      toast.error(data);
      break;
    default:
      break;
  }
}
