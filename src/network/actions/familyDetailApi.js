// actions/someActions.js
import axios from "../api";

import {
  FAMILIES_DETAIL_SUCCESS,
  FAMILIES_DETAIL_FALIURE,
} from "../action_types";
// Action Creators
export const fetchFamiliesDetSuccess = (data) => ({
  type: FAMILIES_DETAIL_SUCCESS,
  payload: data,
});

export const fetchFamiliesDetFailure = (error) => ({
  type: FAMILIES_DETAIL_FALIURE,
  payload: error,
});

// Async Action to Fetch Data
export const onFamiliesDetailApi = (parivarId, rationNo) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `/familyDetail?himParivarId=${parivarId}&rationCardNo=${rationNo}`,
        {}
      );
      //console.log(response, "dashboard response")
      dispatch(fetchFamiliesDetSuccess(response.data));
    } catch (error) {
      dispatch(fetchFamiliesDetFailure(error));
    }
  };
};
