import { Pie } from "react-chartjs-2"
import { Chart, ArcElement, Tooltip, Legend } from "chart.js"
import ChartDataLabels from "chartjs-plugin-datalabels"

Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels)

const PieChartDiagram = ({ theftsToShow }) => {

    const amountByType = new Map()
    theftsToShow.forEach((theft) => {
        amountByType.set(
            theft.biketype.toLowerCase(),
            amountByType.has(theft.biketype.toLowerCase()) ? amountByType.get(theft.biketype.toLowerCase()) + 1 : 0)
    })
    const labels = []
    const values = []

    if (amountByType.size > 0) {
        amountByType.forEach((value, key) => {
            labels.push(key)
            values.push(value)
        })
    }
    else return <></>

    const options = {
        plugins: {
            legend: {
                labels: {
                    color: 'white'
                }
            },
            title: {
                display: true,
                text: 'Gestohlen gesamt',
                color: "white"
            },
            datalabels: {
                color: "transparent"
            }
        }
    }

    const data = {
        labels: labels,
        datasets: [
            {
                label: "gestohlen",
                data: values,
                backgroundColor: [
                    "rgba(251, 122, 66, 0.8)",
                    'rgba(63, 182, 255, 0.8)',
                    'rgba(78, 233, 143, 0.8)',
                    'rgba(230, 255, 0, 0.8)',
                    'rgba(154, 24, 245, 0.8)',
                    'rgba(248, 162, 4, 0.8)',
                    "rgba(219, 9, 181, 0.8)",
                    "rgba(179, 212, 255, 0.8)"

                ],
                borderColor: [
                    "rgba(251, 122, 66, 1)",
                    'rgba(63, 182, 255, 1)',
                    'rgba(78, 233, 143, 1)',
                    'rgba(230, 255, 0, 1)',
                    'rgba(154, 24, 245, 1)',
                    'rgba(248, 162, 4, 1)',
                    "rgba(219, 9, 181, 1)",
                    "rgba(179, 212, 255, 1)"
                ],
                borderWidth: 1
            }
        ]
    }
    return (
        <div className="PieChart">
            <Pie
                data={data}
                options={options}
            />
        </div>
    )
}

export default PieChartDiagram

