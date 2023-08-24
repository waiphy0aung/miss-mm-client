import { toast } from "react-toastify";
import { saveUsersAction } from "../actions/users.action";
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
