const BASE_NUM = 10
const BASE_STEP = 5
const MAX_NUM = 10

export const stepSize = (max: number, isAverage: boolean = false) => {
  if (isAverage) {
    return max / BASE_NUM
  }
  if (max <= MAX_NUM) {
    return 1
  }
  let step = max / BASE_NUM
  while (step % BASE_STEP) {
    step++
  }
  return step
}

const getDigit = (num: number) => num.toString().length

export const getMax = (maxData?: number, isAverage: boolean = false) => {
  if (isAverage) {
    return MAX_NUM
  }
  if (maxData === undefined || maxData <= MAX_NUM) {
    return MAX_NUM
  }
  // データの最大値は何桁か
  const digit = getDigit(maxData)
  // 10の(digit - 1)乗
  const atLeast = BASE_NUM ** (digit - 1)
  // データ最大値の上1桁
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
              stepSize: stepSize(max, isAverage),
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
              stepSize: stepSize(max, isAverage),
            },
          },
        ],
      },
    }
  },
}
