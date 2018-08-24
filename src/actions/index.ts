import { createAction } from "typesafe-actions"

export const moveItem = createAction("moveItem", (resolve) => {
  return (id: number, source: number, destination: number) => resolve({ id, source, destination })
})

export const addItem = createAction("addItem", (resolve) => {
  return (text: string, destination: number) => resolve({ text, destination })
})
