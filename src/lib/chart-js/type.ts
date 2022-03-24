export type Dataset = {
  label: string
  data: number[]
  fill?: boolean
  backgroundColor?: string
  borderColor?: string
}

export type ChartData = {
  labels: string[]
  datasets: Dataset[]
}

export type DataCategory = {
  label: string
  name: string
}

export type ChartCategoryKey =
  | 'blog'
  | 'blogPerUser'
  | 'chat'
  | 'chatPerPost'
  | 'chatPerUser'
  | 'minutes'

export type DataCategories = {
  [k in ChartCategoryKey]: DataCategory[]
}

export type ChartApiPaths = {
  [k in ChartCategoryKey]: string
}

export type ChartApiResponse = {
  labels: string[]
  data: {
    [k: string]: number[]
  }
}
