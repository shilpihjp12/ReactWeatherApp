import React, { Fragment, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, Typography } from '@material-ui/core';
import WbSunnyIcon from '@material-ui/icons/WbSunny';

import { setSelectedDayIndex } from '../../Reducer/weather';
import { TEMPERATURE_VARIANTS } from '../../Util/const';

import classes from './WeatherCard.module.css'

const WeatherCard = (props) => {
    const {
        index = null,
        temp = null,
        day = '',
        selected
    } = props;
    const { temperatureType } = useSelector(state => state.temperatures)
    const { CELSIUS } = TEMPERATURE_VARIANTS;
    const dispatch = useDispatch();

    //tells react to store the function and resuse on component recreation. since this function will never change
    //will also avoid child component to recreat even if there is no change in props.
    const setSelectedDayIndexHandler = useCallback((index) => {
        dispatch(setSelectedDayIndex(index));
    }, [dispatch])
    return (
        <Fragment>

            <Card
                className={`${classes.Card} ${selected ? classes.Selected : undefined}`}
                onClick={() => setSelectedDayIndexHandler(index)}
            >
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Temperature
                    </Typography>
                    <Typography className={classes.Pos} color="textSecondary">
                        {temp}
                        {temp && <span>&#176;</span>}
                        {temp && temperatureType
                            ? temperatureType === CELSIUS
                                ? 'C'
                                : 'F'
                            : null}
                        <WbSunnyIcon className={classes.IconPos} fontSize='large' />
                    </Typography>
                    <Typography variant="h5" component="h2">
                        Date
                    </Typography>
                    <Typography className={classes.Pos} color="textSecondary">
                        {day}
                    </Typography>
                </CardContent>
            </Card>
        </Fragment>
    );
}

export default React.memo(WeatherCard);