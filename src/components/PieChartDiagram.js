import { Pie } from "react-chartjs-2"
import { Chart, ArcElement, Tooltip, Legend } from "chart.js"
import ChartDataLabels from "chartjs-plugin-datalabels"

Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels)

const PieChartDiagram = ({ theftsToShowPieChart }) => {
    const labels = []
    const values = []

    if (theftsToShowPieChart === null || theftsToShowPieChart.size === 0) return <div className="PieChart"></div>
    else {
        theftsToShowPieChart.forEach((value, key) => {
            labels.push(key)
            values.push(value)
        })
    }

    console.log(theftsToShowPieChart)

    const options = {
        plugins: {
            legend: {
                labels: {
                    color: 'white'
                }
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
                    "rgba(0, 63, 92, 0.8)",
                    'rgba(47, 75, 124, 0.8)',
                    'rgba(102, 81, 145, 0.8)',
                    'rgba(160, 81, 149, 0.8)',
                    'rgba(212, 80, 135, 0.8)',
                    'rgba(249, 93, 106, 0.8)',
                    "rgba(251, 122, 66, 0.8)",
                    "rgba(252, 164, 0, 0.8)"

                ],
                borderColor: [
                    "rgba(0, 63, 92, 1)",
                    'rgba(47, 75, 124, 1)',
                    'rgba(102, 81, 145, 1)',
                    'rgba(160, 81, 149, 1)',
                    'rgba(212, 80, 135, 1)',
                    'rgba(249, 93, 106, 1)',
                    "rgba(251, 122, 66, 1)",
                    "rgba(252, 164, 0, 1)"
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