// actions/someActions.js
import axios from "../api";

import { DISTRICT_SUCCESS, DISTRICT_FALIURE } from "../action_types";
// Action Creators
export const fetchDistrictSuccess = (data) => ({
  type: DISTRICT_SUCCESS,
  payload: data,
});

export const fetchDistrictFailure = (error) => ({
  type: DISTRICT_FALIURE,
  payload: error,
});

// Async Action to Fetch Data
export const onDistrict = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/getDistricts`, {});
      // console.log(response, "dashboard response")
      dispatch(fetchDistrictSuccess(response.data));
    } catch (error) {
      dispatch(fetchDistrictFailure(error));
    }
  };
};
