export interface Config {
  data: string[]
  currentIndex: number
  assignTo: 'param' | 'query'
  assignToKey: string
}
