import classnames from "classnames"
import { ActionButton, IconButton } from "office-ui-fabric-react/lib/Button"
import { DirectionalHint } from "office-ui-fabric-react/lib/Callout"
import * as React from "react"
import { ConnectDropTarget, DropTarget, DropTargetCollector, DropTargetSpec } from "react-dnd"
import { connect } from "react-redux"
import { Item } from "./api"
import "./Column.css"
import { moveItem, State } from "./reducers"
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
    console.log(item, props)
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
  (state: State, ownProps: Props) => ({
    items: state.swimlanes[ownProps.id].items.map((itemId) => state.items[itemId]),
    name: state.swimlanes[ownProps.id].name,
  }),
  { moveItem },
)(Column)
