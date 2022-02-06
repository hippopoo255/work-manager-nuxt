export default class {
  key: string
  data: any

  constructor(key: string, initialValue: boolean[] = [false]) {
    this.key = key
    this.data = initialValue
  }

  init(): void {
    const d = JSON.parse(<string>localStorage.getItem(this.key))
    if (!d || d[0] === null) {
      this.data = [false]
    } else {
      this.data = d
    }
  }

  getData(): boolean {
    return this.data
  }

  save(): void {
    localStorage.setItem(this.key, JSON.stringify(this.data))
  }

  regist(payload: any): void {
    this.data.length = 0
    this.data.push(payload)
    this.save()
  }

  remove(): void {
    localStorage.removeItem(this.key)
  }
}
