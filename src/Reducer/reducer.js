import * as actionTypes from "./actionTypes";

import { TEMPERATURE_VARIANTS } from '../Util/const';
import { convertTemperatureInDays } from '../Util/util';

const { FAHRENHEIT, CELSIUS } = TEMPERATURE_VARIANTS;

const initialState = {
isLoading: false,
temperatures: null,
error: null,
temperatureType: FAHRENHEIT,
selectedDayIndex: null
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_TEMPERATURES: {
        return {
            ...state,
            isLoading: true,
            error: null
        };
        }
        case actionTypes.FETCH_TEMPERATURES_SUCCESS: {
        return {
            ...state,
            isLoading: false,
            temperatures: action.payload,
            selectedDayIndex: 0
        };
        }
        case actionTypes.FETCH_TEMPERATURES_FAILURE: {
        return {
            ...state,
            isLoading: false,
            error: action.payload
        };
        }
        case actionTypes.TO_CELSIUS_TEMPERATURES: {
        const { temperatures } = state;
        return {
            ...state,
            temperatureType: CELSIUS,
            temperatures: temperatures
            ? {
                ...temperatures,
                days: convertTemperatureInDays(temperatures.days, CELSIUS)
                }
            : null
        };
        }
        case actionTypes.TO_FAHRENHEIT_TEMPERATURES: {
        const { temperatures } = state;
        return {
            ...state,
            temperatureType: FAHRENHEIT,
            temperatures: temperatures
            ? {
                ...temperatures,
                days: convertTemperatureInDays(temperatures.days, FAHRENHEIT)
                }
            : null
        };
        }
        case actionTypes.SET_SELECTED_TEMPERATURE_DAY: {
        return {
            ...state,
            selectedDayIndex: action.payload
        };
        }
        default:
        return state;
    }
};