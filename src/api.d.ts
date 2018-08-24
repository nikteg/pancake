export type Swimlane = {
  id: number
  name: string
  items: number[]
}

export type Item = {
  id: number
  text: string
  swimlane: number
}
