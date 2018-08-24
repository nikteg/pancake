import { ActionType, createAction, getType } from "typesafe-actions"
import { Item, Swimlane } from "../api"

export const moveItem = createAction("moveItem", (resolve) => {
  return (id: number, source: number, destination: number) => resolve({ id, source, destination })
})

export type GeneralAction = ActionType<typeof moveItem>

export type RootAction = GeneralAction

export type State = {
  swimlanes: Record<number, Swimlane>
  items: Record<number, Item>
}

const initialState: State = {
  swimlanes: {
    0: { id: 0, name: "Backlog", items: [0] },
    1: { id: 1, name: "In progress", items: [] },
    2: { id: 2, name: "Needs review", items: [] },
    3: { id: 3, name: "Done", items: [] },
  },
  items: {
    0: { id: 0, text: "Hello world", swimlane: 0 },
  },
}

export default (state: State = initialState, action: GeneralAction) => {
  switch (action.type) {
    case getType(moveItem): {
      const { id, source, destination } = action.payload

      const newSource = state.swimlanes[source]
      newSource.items.filter((itemId) => itemId !== id)

      // TODO: use lodash here

      console.log(state.swimlanes[source].items, newSource.items)

      const newDestination = state.swimlanes[destination]
      newDestination.items.concat([id])

      const newItems = state.items
      newItems[id].swimlane = destination

      return {
        swimlanes: Object.assign({}, state.swimlanes, { [source]: newSource, [destination]: newDestination }),
        items: newItems,
      }
    }
  }

  return state
}
