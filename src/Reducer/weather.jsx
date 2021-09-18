import axios from 'axios'

import { WEATHER_API } from '../Util/const';
import { temperatureInDays } from '../Util/util';
import * as actionTypes from "./actionTypes";

export const fetchTemperatures = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.FETCH_TEMPERATURES
    });
    const { data } = await axios.get(WEATHER_API)

    dispatch({
      type: actionTypes.FETCH_TEMPERATURES_SUCCESS,
      payload: {
        ...data,
        days: temperatureInDays(data.list)
      }
    });
  } catch (error) {
    dispatch({
      type: actionTypes.FETCH_TEMPERATURES_FAILURE,
      payload: error
    });
  }
};

export const convertToCelsius = () => (dispatch) => {
  dispatch({
    type: actionTypes.TO_CELSIUS_TEMPERATURES
  });
};

export const convertToFahrenheit = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.TO_FAHRENHEIT_TEMPERATURES
    });
  }
};

export const setSelectedDayIndex = (index) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_SELECTED_TEMPERATURE_DAY,
    payload: index
  });
};