import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';

import { prepareDataForBarChart } from '../../Util/util';

/**
 * This component is used to manage the Bar Chart of application
 */
const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};


const BarChart = () => {
    const { temperatures, selectedDayIndex } = useSelector(state => state.temperatures)

    const data = prepareDataForBarChart(selectedDayIndex, temperatures?.days);

    return (
        <Fragment>
            <Bar data={data} options={options} />
        </Fragment>
    )
}

export default BarChart