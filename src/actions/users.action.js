import { dispatch } from "../stores";

export const saveUsersAction = data => dispatch("SaveUsersAction",data);

export const deleteUserAction = id => dispatch("DeleteUserAction",id);
