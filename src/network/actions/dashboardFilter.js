// actions/someActions.js
import axios from "../api";

import {
  DASHBOARD_REPORT_SUCCESS,
  DASHBOARD_REPORT_FALIURE,
} from "../action_types";
// Action Creators
export const fetchDashboardSuccess = (data) => ({
  type: DASHBOARD_REPORT_SUCCESS,
  payload: data,
});

export const fetchDashboardFaliure = (error) => ({
  type: DASHBOARD_REPORT_FALIURE,
  payload: error,
});

// Async Action to Fetch Data
export const onDashboarFilters = (queryParams) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/report/survey`, {
        params: queryParams,
      });
      dispatch(fetchDashboardSuccess(response.data));
    } catch (error) {
      dispatch(fetchDashboardFaliure(error));
    }
  };
};
