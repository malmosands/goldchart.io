import React, { useEffect, useState } from "react"
import BarChart from 'chart.js';

const Chart = () => {
  const chartRef = React.createRef();
  const [ currentPrice, setCurrentPrice ] = useState();
  const [ prices, setPrices ] = useState();

  const fetchCurrentPrice = () => {
    fetch("https://financialmodelingprep.com/api/v3/quote/ZGUSD")
      .then((res) => res.json())
      .then((data) => {
        setCurrentPrice(data)
      })
  }

  const fetchPrices = () => {
    fetch("https://financialmodelingprep.com/api/v3/historical-chart/1min/ZGUSD")
      .then((res) => res.json())
      .then((data) => {
        setPrices(data)
      })
  }
  
  useEffect(() => {
    const myChartRef = chartRef.current.getContext("2d");

    fetchPrices();
        
    new BarChart(myChartRef, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "March", "Jan", "Feb", "March", "Jan", "Feb"],
        datasets: [
          {
            data: [8256.59, 7473.62, 7346.05, 8576.35, 6475.52, 7364.75, 8467.35, 8346.25, 8335.52, 8475.42],
            borderColor: "rgba(0, 0, 0, .15)",
            backgroundColor: "rgba(0, 0, 0, .05)"
          }
        ]
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            ticks: {
              fontSize: "16",
              fontColor: "#718096"
            },
            gridLines: {
              color: "rgba(0, 0, 0, .25)"
            }
          }],
          yAxes: [{
            ticks: {
              fontSize: "16",
              fontColor: "#718096",
            },
            gridLines: {
              color: "rgba(0, 0, 0, .25)"
            }
          }]
        }
      } 
    });
  }, [])

  return (
    <div style={{zIndex: "-10"}} className="absolute top-0 bottom-0 right-0 left-0">
      <canvas
        id="myChart"
        ref={chartRef}
      />
    </div>
  )
}

export default Chart
