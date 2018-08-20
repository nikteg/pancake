import * as React from "react"
import "./Board.css"
import { SwimlaneItem } from "./SwimlaneItem"
import { DragDropContext, DropTarget, DropTargetCollector, DropTargetSpec, ConnectDropTarget } from "react-dnd"
import HTML5Backend from "react-dnd-html5-backend"
import classnames from "classnames"

const columns = ["Backlog", "In progress", "Needs review", "Done", "Extra"]

let items: { [key: string]: string[] } = { Backlog: ["Implement drag-n-drop"] }

type Props = {
  name: string
  connectDropTarget?: ConnectDropTarget
  isOver?: boolean
  canDrop?: boolean
}

const itemTarget: DropTargetSpec<Props> = {
  canDrop(props) {
    return true
  },
  drop(props, monitor) {
    const item = monitor.getItem()
    console.log(props, item)

    items = { [props.name]: [item.text] }
  },
}

const collect: DropTargetCollector<{}> = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }
}

@DropTarget("item", itemTarget, collect)
class Column extends React.Component<Props> {
  render() {
    const { name, connectDropTarget, isOver } = this.props
    return (
      connectDropTarget &&
      connectDropTarget(
        <div className={classnames("Column", { Column__isOver: isOver })}>
          <div className="Column--header">{name}</div>
          <div className="Column--items">
            {items[name] && items[name].map((text: string) => <SwimlaneItem key={text} text={text} />)}
          </div>
        </div>,
      )
    )
  }
}

@DragDropContext(HTML5Backend)
class Board extends React.Component {
  public render() {
    return (
      <div className="Board">
        {columns.map((col) => (
          <Column key={col} name={col} />
        ))}
      </div>
    )
  }
}

export default Board
