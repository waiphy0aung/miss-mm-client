import { toast } from "react-toastify";
import { saveLockAction } from "../actions/lock.action";
import fetchUtilities from "../utilities/fetch.utility"
import { Cookies } from "react-cookie"
const cookie = new Cookies;

export const getLockService = async () => {
  const fetchResponse = await fetchUtilities.get({
    endpoint: '/lock',
    headers: { xToken: cookie.get('token') }
  })
  const { status, data } = fetchResponse;
  switch (status) {
    case 'success':
      saveLockAction(data);
      break;
    case 'error':
      toast.error(data);
      break;
    default: break;
  }
}

export const setLockService = async () => {
  const fetchResponse = await fetchUtilities.post({
    endpoint: '/lock',
    headers: { xToken: cookie.get('token') }
  })
  const { status, data } = fetchResponse;
  switch (status) {
    case 'success':
      break;
    case 'error':
      toast.error(data);
      break;
    default: break;
  }
}

export const setResultService = async () => {
  const fetchResponse = await fetchUtilities.post({
    endpoint: '/lock/result',
    headers: { xToken: cookie.get('token') }
  })
  const { status, data } = fetchResponse;
  switch (status) {
    case 'success':
      break;
    case 'error':
      toast.error(data);
      break;
    default: break;
  }
}

export const setVotingTimeService = async (time) => {
  const fetchResponse = await fetchUtilities.post({
    endpoint: "/lock/voting-time",
    headers: { xToken: cookie.get("token") },
    data: time
  })

  const { status, data } = fetchResponse;
  switch (status) {
    case 'success':
      saveLockAction(data);
      toast.success("Saved successfully")
      break;
    case 'error':
      toast.error(data);
      break;
    default: break;
  }
}
