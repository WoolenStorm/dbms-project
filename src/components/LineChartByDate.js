import React from 'react';
import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


const LineChartByDate = ({ theftsToShow }) => {

    const typesWithDates = new Map()

    theftsToShow.forEach((theft) => {
        const type = theft.bikeType
        const date = theft.theftStart.slice(0, 7)
        if (typesWithDates.has(type)) {
            const amountByDate = typesWithDates.get(type)
            if (amountByDate.has(date)) {
                amountByDate.set(date, amountByDate.get(date) + 1)
            } else {
                amountByDate.set(date, 0)
            }
        } else {
            const amountByDate = new Map()
            amountByDate.set(date, 0)
            typesWithDates.set(type, amountByDate)
        }
    })

    if (typesWithDates.size === 0) return <></>

    const maps = [...typesWithDates.values()]
    console.log("maps")
    console.log(maps)
    console.log(maps.sort())
    console.log(maps[0] ? [...maps[0].keys()] : "null....")

    let colorIndex = -1

    const datasets = []
    const dates = []

    typesWithDates.forEach((value, key) => {
        colorIndex++
        const amountByDate = value

        console.log("entries")
        console.log([...amountByDate.values()])
        const amountByDateSorted = [...amountByDate.entries()].sort((a, b) => a[0] > b[0])
        console.log(amountByDateSorted)
        const amounts = []
        amountByDateSorted.forEach((pair) => {
            amounts.push(pair[1])
            if (!dates.includes(pair[0])) dates.push(pair[0])
        })
        console.log(amounts)
        console.log(dates)

        datasets.push({
            label: key,
            data: amounts,
            borderColor: colors[colorIndex],
            backgroundColor: colors[colorIndex]
        })
    })
    // {

    console.log(datasets)
    datasets.sort((a, b) => a.label > b.label)
    console.log(datasets)

    const data = {
        labels: dates.size !== 0 ? dates : ["default label"],
        datasets: datasets
    };

    return <div className="lineChart"><Line options={options} data={data} /></div>
}


const colors = [
    "rgba(251, 122, 66, 0.8)",
    'rgba(63, 182, 255, 0.8)',
    'rgba(78, 233, 143, 0.8)',
    'rgba(230, 255, 0, 0.8)',
    'rgba(154, 24, 245, 0.8)',
    'rgba(248, 162, 4, 0.8)',
    "rgba(219, 9, 181, 0.8)",
    "rgba(179, 212, 255, 0.8)"
]

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
            labels: {
                color: "white"
            }
        },
        title: {
            display: true,
            text: 'Gestohlen nach Monat',
            color: "white"
        },
        datalabels: {
            color: "transparent"
        },
    },
    scales: {
        x: {
            grid: {
                color: 'rgba(59, 57, 85, 1)',
                borderColor: 'white'
            },
            ticks: {
                color: 'white',
                borderColor: 'white'
            }
        },
        y: {
            grid: {
                color: 'rgba(59, 57, 85, 1)',
                borderColor: 'white'
            },
            ticks: {
                color: 'white',
                borderColor: 'white'
            }
        }
    }
};

export default LineChartByDate