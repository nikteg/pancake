import { SwimlaneItem } from "./SwimlaneItem"
import { DropTarget } from "react-dnd"
import classnames from "classnames"
import { DropTargetCollector, DropTargetSpec, ConnectDropTarget } from "react-dnd"
import { GoPlus, GoChevronDown } from "react-icons/go"
import "./Column.css"

import * as React from "react"

export type Props = {
  name: string
  connectDropTarget?: ConnectDropTarget
  isOver?: boolean
  canDrop?: boolean
  onMoveItem: Function
  items: string[]
}

export const itemTarget: DropTargetSpec<Props> = {
  canDrop(props) {
    return true
  },
  drop(props, monitor) {
    const item = monitor.getItem()
    props.onMoveItem([item.text])
  },
}

export const collect: DropTargetCollector<{}> = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }
}

@DropTarget("item", itemTarget, collect)
export class Column extends React.Component<Props> {
  render() {
    const { name, connectDropTarget, isOver, items, onMoveItem } = this.props
    return (
      connectDropTarget &&
      connectDropTarget(
        <div className={classnames("Column", { Column__isOver: isOver })}>
          <div className="Column--header">
            <div className="Column--header--text">{name}</div>
            <div className="Column--header--actions">
              <button>
                <GoChevronDown size="18px" />
              </button>
            </div>
          </div>
          <div className="Column--add">
            <button onClick={() => onMoveItem(items.concat(["New"]))}>
              <GoPlus size="18px" />
              <span>Add item</span>
            </button>
          </div>
          <div className="Column--items">
            {items.map((text, i) => (
              <SwimlaneItem key={i} index={i} text={text} />
            ))}
          </div>
        </div>,
      )
    )
  }
}
