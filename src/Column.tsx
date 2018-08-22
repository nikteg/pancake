import { SwimlaneItem } from "./SwimlaneItem"
import { DropTarget } from "react-dnd"
import classnames from "classnames"
import { DropTargetCollector, DropTargetSpec, ConnectDropTarget } from "react-dnd"
import { IconButton, ActionButton } from "office-ui-fabric-react/lib/Button"
import "./Column.css"

import * as React from "react"
import { DirectionalHint } from "office-ui-fabric-react/lib/Callout"

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
    const { name, connectDropTarget, isOver, items } = this.props
    return (
      connectDropTarget &&
      connectDropTarget(
        <div className={classnames("Column", { Column__isOver: isOver })}>
          <div className="Column--header">
            <div className="Column--header--text">{name}</div>
            <div className="Column--header--actions">
              <IconButton
                styles={{ root: { color: "white" } }}
                menuIconProps={{ iconName: "More" }}
                menuProps={{
                  directionalHint: DirectionalHint.bottomRightEdge,
                  items: [
                    {
                      text: "Do thing",
                      key: "thing",
                      onClick: () => {},
                    },
                    {
                      text: "Do another thing",
                      key: "another",
                    },
                  ],
                }}
              />
            </div>
          </div>
          <div className="Column--add">
            <ActionButton styles={{ flexContainer: { justifyContent: "center" } }} iconProps={{ iconName: "Add" }}>
              Add more items...
            </ActionButton>
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
