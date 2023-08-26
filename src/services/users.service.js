import { toast } from "react-toastify";
import { deleteUserAction, saveUsersAction } from "../actions/users.action";
import fetchUtilities from "../utilities/fetch.utility"
import { Cookies } from "react-cookie"
const cookie = new Cookies();

export const getUsersService = async () => {
  const fetchResponse = await fetchUtilities.get({
    endpoint: "/users/",
    headers: { xToken: cookie.get('token') }
  })

  const { status, data } = fetchResponse;
  switch (status) {
    case "success":
      saveUsersAction(data);
      break;
    case "error":
      toast.error(data);
      break;
    default:
      break;
  }
}

export const deleteUserService = async (id, callback) => {
  const fetchResponse = await fetchUtilities.delete({
    endpoint: "/users/delete/" + id,
    headers: { xToken: cookie.get('token') }
  })

  const { status, data } = fetchResponse;
  switch (status) {
    case "success":
      deleteUserAction(data);
      toast.success("Deleted successfully")
      callback(undefined)
      break;
    case "error":
      toast.error(data);
      callback(undefined)
      break;
    default: break;
  }
}
