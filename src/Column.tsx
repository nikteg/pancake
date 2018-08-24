import classnames from "classnames"
import { IconButton } from "office-ui-fabric-react/lib/Button"
import { DirectionalHint } from "office-ui-fabric-react/lib/Callout"
import * as React from "react"
import { ConnectDropTarget, DropTarget, DropTargetCollector, DropTargetSpec } from "react-dnd"
import { connect } from "react-redux"
import { moveItem } from "./actions"
import { Item } from "./api"
import "./Column.css"
import { RootState } from "./reducers"
import { SwimlaneItem } from "./SwimlaneItem"

type StateProps = {
  name: string
  items: Item[]
}

type DispatchProps = {
  moveItem: typeof moveItem
}

type OwnProps = {
  id: number
  onAddItem: (column: number) => void
  connectDropTarget?: ConnectDropTarget
  isOver?: boolean
  canDrop?: boolean
}

type Props = OwnProps & StateProps & DispatchProps

export const itemTarget: DropTargetSpec<Props> = {
  canDrop(props) {
    return true
  },
  drop(props, monitor) {
    const item = monitor.getItem() as Item
    props.moveItem(item.id, item.swimlane, props.id)
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
class Column extends React.Component<Props> {
  render() {
    const { id, name, connectDropTarget, isOver, items, onAddItem } = this.props
    return (
      connectDropTarget &&
      connectDropTarget(
        <div className={classnames("Column", { Column__isOver: isOver })}>
          <div className="Column--header">
            <div className="Column--header--text">{name}</div>
            <div className="Column--header--actions">
              <IconButton
                styles={{ root: { color: "white" } }}
                iconProps={{ iconName: "CalculatorAddition" }}
                onClick={() => onAddItem(id)}
              />
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
          <div className="Column--items">
            {items.map((item) => (
              <SwimlaneItem key={item.id} item={item} />
            ))}
          </div>
        </div>,
      )
    )
  }
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState, ownProps: Props) => ({
    items: state.swimlanes[ownProps.id].items.map((itemId) => state.items[itemId]),
    name: state.swimlanes[ownProps.id].name,
  }),
  { moveItem },
)(Column)
