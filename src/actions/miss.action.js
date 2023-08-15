import { dispatch } from '../stores';

export const saveMissDataAction = misses => dispatch('SaveMissDataAction', misses);

export const addMissAction = miss => dispatch('AddMissAction',miss);

export const updateMissAction = miss => dispatch('UpdateMissAction',miss);

export const deleteMissAction = miss => dispatch('DeleteMissAction',miss);
