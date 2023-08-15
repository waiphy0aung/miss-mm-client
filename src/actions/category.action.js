import { dispatch } from "../stores";

export const saveCategoryDataAction = categories => dispatch('SaveCategoryDataAction',categories);

export const addCategoryDataAction = category => dispatch('AddCategoryAction',category);

export const updateCategoryAction = category => dispatch('UpdateCategoryAction',category);

export const deleteCategoryAction = id => dispatch('DeleteCategoryAction',id);
