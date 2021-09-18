import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from '@material-ui/core'

import BarChart from '../../Component/BarChart/BarChart'
import Error from '../../Component/Error/Error'
import Header from '../../Component/Header/Header'
import Slider from '../../Component/Slider/Slider'
import Spinner from '../../Component/Spinner/Spinner'

import { fetchTemperatures } from '../../Reducer/weather'

/**
 * This function container is getting used for rendering complete app.
 */
const Weather = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchTemperatures())

    }, [dispatch])
    const { isLoading, error } = useSelector(state => state.temperatures)
    return (
        isLoading ? (
            <Spinner />
        ) : error ? (
            <Error />
        ) : (
            <>
                <Header />
                <Container maxWidth="md">
                    <Slider />
                    <BarChart />
                </Container>
            </>
        )

    )

}

export default Weather;