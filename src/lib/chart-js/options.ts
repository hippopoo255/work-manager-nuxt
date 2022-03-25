const BASE_NUM = 10
const MAX_NUM = 10

const stepSize = (min: number, max: number, isAverage: boolean = false) =>
  (min + max) / BASE_NUM < 1 && !isAverage ? 1 : (min + max) / BASE_NUM

const getDigit = (num: number) => num.toString().length

const getMax = (maxData?: number, isAverage: boolean = false) => {
  if (isAverage) {
    return MAX_NUM
  }
  if (maxData === undefined || maxData <= MAX_NUM) {
    return MAX_NUM
  }
  const digit = getDigit(maxData)
  const atLeast = BASE_NUM ** (digit - 1)
  const topDigitNum = Math.floor(maxData / atLeast)
  return atLeast * (topDigitNum + 1)
}

export default {
  default: (maxData?: number, isAverage: boolean = false) => {
    const max = getMax(maxData, isAverage)

    return {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: true,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: 'rgba(0, 0, 0, 0.6)',
              suggestedMin: 0,
              barPercentage: 0.5,
              min: 0,
              max,
              stepSize: stepSize(0, max, isAverage),
            },
          },
        ],
      },
    }
  },
  horizontalBar: (maxData?: number, isAverage: boolean = false) => {
    const max = getMax(maxData, isAverage)
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
              fontColor: 'rgba(0, 0, 0, 0.6)',
              suggestedMin: 0,
              barPercentage: 0.5,
              min: 0,
              max,
              stepSize: stepSize(0, max, isAverage),
            },
          },
        ],
      },
    }
  },
}
