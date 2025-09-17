import { useState } from "react"
import ReactApexChart from "react-apexcharts"
import type { ApexOptions } from "apexcharts"

export const Chart = ({percentage, label} : {percentage: number, label: string}) => {
  const [state] = useState({
    series: [percentage],
    options: {
      chart: {
        height: 350,
        type: 'radialBar',
      } as ApexOptions['chart'],
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: '70%',
            background: '#fff',
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: 'front',
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.5,
            },
          },
          track: {
            background: '#fff',
            strokeWidth: '67%',
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.7,
            },
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: '#888',
              fontSize: '17px',
            },
            value: {
              color: '#111',
              fontSize: '36px',
              show: true,
            },
          },
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: ['#D81B60'],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: 'round',
      },
      labels: ['Calificación'],
    },
  })

  return (
    <div>
      <div id='card'>
        <div id='chart'>
          <ReactApexChart
            options={state.options as ApexOptions}
            series={state.series}
            type='radialBar'
            height={350}
          />
          <p className='text-center text-gray-700 dark:text-gray-300'>
            Tu puntuación <span className="font-bold">{label}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

    