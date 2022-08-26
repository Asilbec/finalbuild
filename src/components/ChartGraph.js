import React from "react";
import { useStateContext } from "../context";
import ReactApexChart from "react-apexcharts";


function Chartz() {
    const { predictionres, classNames } = useStateContext()
    const modify = predictionres[0].map(x=>x*100)
    const series = [{
        name : 'Confience',
        data: modify
    }]
    const options = {
        options: {

            chart: {
                type: 'bar',
                width : '100%'
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    horizontal: true,
                }
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: classNames,
            },
            yaxis : {
                forceNiceScale :true
            }
        },
    }
    return (
        <ReactApexChart options={options.options} series={series} type="bar" width={'100%'} />
    )
}

export default Chartz