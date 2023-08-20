import { dispatch } from "../stores";

export const saveLockAction = data => dispatch('SaveLockAction',data)

export const setLockAction = data => dispatch('SetLockAction',data)
