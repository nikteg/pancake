import * as React from "react"
import { DragDropContext } from "react-dnd"
import HTML5Backend from "react-dnd-html5-backend"
import { connect } from "react-redux"
import { Swimlane } from "./api"
import "./Board.css"
import Column from "./Column"
import { State } from "./reducers"

type Props = {
  columns: Swimlane[]
}

@DragDropContext(HTML5Backend)
class Board extends React.Component<Props> {
  public render() {
    const { columns } = this.props

    return (
      <div className="Board">
        {columns.map((col) => (
          <Column id={col.id} key={col.id} />
        ))}
      </div>
    )
  }
}

export default connect((state: State) => ({
  columns: Object.keys(state.swimlanes).map((key) => state.swimlanes[key]),
}))(Board)
