import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import WeatherCard from '../WeatherCard/WeatherCard';
import classes from './Slider.module.css';

/**
 * This component render the slider component of application on the screen.
 * @returns 
 */
const Slider = () => {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1
        }
    };
    const temperatures = useSelector(state => state.temperatures)
    const days = temperatures && temperatures?.temperatures ? temperatures?.temperatures.days : []
    return (
        <Fragment>
            <Carousel responsive={responsive} className={classes.Carousel}>
                {
                    Object.values(days).map((dayInfo, index) => (
                        <WeatherCard
                            key={dayInfo?.dayFormatted}
                            temp={dayInfo?.avgTemperature}
                            day={dayInfo?.dayFormatted}
                            selected={index === temperatures.selectedDayIndex ? true : false}
                            index={index} />
                    ))
                }

            </Carousel>
        </Fragment>

    )
}

export default Slider