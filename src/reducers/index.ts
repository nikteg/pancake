import produce from "immer"
import { ActionType, getType } from "typesafe-actions"
import * as actions from "../actions"
import { Item, Swimlane } from "../api"

export type GeneralAction = ActionType<typeof actions>

export type RootAction = GeneralAction

export type RootState = {
  swimlanes: Record<number, Swimlane>
  items: Record<number, Item>
}

const initialState: RootState = {
  swimlanes: {
    0: { id: 0, name: "Backlog", items: [0, 2] },
    1: { id: 1, name: "In progress", items: [] },
    2: { id: 2, name: "Needs review", items: [] },
    3: { id: 3, name: "Done", items: [1] },
    4: { id: 4, name: "Extra", items: [] },
  },
  items: {
    0: { id: 0, text: "Implement backend", swimlane: 0, assigned: ["Karl Andersson", "John Hansson"] },
    1: { id: 1, text: "Add redux and connect store", swimlane: 3, assigned: ["Sven Andersson"] },
    2: { id: 2, text: "Dark theme", swimlane: 0 },
  },
}

export default (state: RootState = initialState, action: GeneralAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case getType(actions.moveItem):
        {
          const { id, source, destination } = action.payload
          draft.swimlanes[source].items.splice(draft.swimlanes[source].items.indexOf(id), 1)
          draft.swimlanes[destination].items.push(id)
          draft.items[id].swimlane = destination
        }
        break
      case getType(actions.addItem):
        {
          const { text, destination } = action.payload

          const id = Object.keys(state.items).length

          draft.items[id] = { id, text, swimlane: destination, assigned: ["Default User"] }
          draft.swimlanes[destination].items.push(id)
        }
        break
    }
  })
