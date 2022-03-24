// const stepSize = (min: number, max: number, isAverage: boolean = false) =>
//   (min + max) / 10 < 1 && !isAverage ? 1 : (min + max) / 10

export const horizontalBarOptions = () => {}

export default {
  default: () => {
    // default: (/*max?: number, isAverage: boolean = false*/) => {
    // const m = max === undefined ? 5 : max

    return {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: true,
      },
      scales: {
        xAxes: [
          {
            ticks: {
              // fontColor: 'rgba(254, 254, 254, 0)',
              suggestedMin: 0,
              barPercentage: 0.5,
              // min: 0,
              // max: m,
              // stepSize: stepSize(0, m, isAverage),
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              fontColor: 'rgba(254, 254, 254, 0)',
              suggestedMin: 0,
              barPercentage: 0.5,
              // min: 0,
              // max: m <= 10 && !isAverage ? 5 : m,
              // stepSize: stepSize(0, m, isAverage),
            },
          },
        ],
      },
    }
  },
  horizontalBar: () => {
    // horizontalBar: (max?: number, isAverage: boolean = false) => {
    // const m = max === undefined ? 5 : max
    return {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: true,
      },
      scales: {
        xAxes: [
          {
            ticks: {
              fontColor: 'rgba(254, 254, 254, 0)',
              suggestedMin: 0,
              barPercentage: 0.5,
              // min: 0,
              // max: m,
              // stepSize: stepSize(0, m, isAverage),
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              // fontColor: 'rgba(254, 254, 254, 0)',
              suggestedMin: 0,
              barPercentage: 0.5,
              // min: 0,
              // max: m <= 10 && !isAverage ? 5 : m,
              // stepSize: stepSize(0, m, isAverage),
            },
          },
        ],
      },
    }
  },
}
