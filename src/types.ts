export interface Config {
  data: string[]
  currentIndex: number
  assignTo: {
    assignToType: 'param' | 'query'
    assignToKey: string
  }[]
  lock?: boolean
}
