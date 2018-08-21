import * as React from "react"
import "./Board.css"
import { DragDropContext } from "react-dnd"
import HTML5Backend from "react-dnd-html5-backend"
import { Column } from "./Column"

const columns = ["Backlog", "In progress", "Needs review", "Done", "Extra"]

@DragDropContext(HTML5Backend)
class Board extends React.Component {
  state = {
    items: { Backlog: ["Implement drag-n-drop"] },
  }

  moveItem = (from: string, fromIndex: number, to: string) => {
    // const items = this.state.items[from]
    // this.setState({ items: { [column]: items } })
  }

  columnItems = (column: string) => {
    return this.state.items[column] ? this.state.items[column] : []
  }

  public render() {
    return (
      <div className="Board">
        {columns.map((col) => (
          <Column key={col} name={col} items={this.columnItems(col)} onMoveItem={this.moveItem} />
        ))}
      </div>
    )
  }
}

export default Board
