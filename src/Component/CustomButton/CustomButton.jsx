import React from 'react';
import { useDispatch } from 'react-redux';

import { fetchTemperatures } from '../../Reducer/weather';

import classes from './CustomButton.module.css'

/**
 * This component is getting used for button used in application
 */
const CustomButton = (props) => {
    const dispatch = useDispatch()
    const refreshButtonOnclickHandler = () => {
        dispatch(fetchTemperatures())
    }
    return (
        <button 
            onClick={refreshButtonOnclickHandler}
            className={`${classes.button} ${props.className}`}>{props.children}</button>
    );
}

export default CustomButton;