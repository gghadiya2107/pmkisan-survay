// actions/someActions.js
import axios from "../api";

import { FAMILIES_LIST_SUCCESS, FAMILIES_LIST_FALIURE } from "../action_types";
// Action Creators
export const fetchFamiliesListSuccess = (data) => ({
  type: FAMILIES_LIST_SUCCESS,
  payload: data,
});

export const fetchFamiliesListFailure = (error) => ({
  type: FAMILIES_LIST_FALIURE,
  payload: error,
});

export const onFamiliesList = (queryParams) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/familyList`, {
        params: queryParams,
      });
      dispatch(fetchFamiliesListSuccess(response.data));
    } catch (error) {
      dispatch(fetchFamiliesListFailure(error));
    }
  };
};
