import classnames from "classnames"
import { Persona, PersonaSize } from "office-ui-fabric-react/lib/Persona"
import * as React from "react"
import { ConnectDragSource, DragSource, DragSourceCollector, DragSourceSpec } from "react-dnd"
import { Item } from "./api"
import "./SwimlaneItem.css"

type Props = {
  item: Item
  connectDragSource?: ConnectDragSource
  isDragging?: boolean
}

const itemSource: DragSourceSpec<Props, Item> = {
  beginDrag(props) {
    return props.item
  },
}

const collect: DragSourceCollector<{}> = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

@DragSource("item", itemSource, collect)
export class SwimlaneItem extends React.Component<Props> {
  render() {
    const { isDragging, connectDragSource, item } = this.props
    return (
      connectDragSource &&
      connectDragSource(
        <div className={classnames("SwimlaneItem", { SwimlaneItem__isDragging: isDragging })}>
          <div className="SwimlaneItem--text">{item.text}</div>
          <div className="SwimlaneItem--assigned">
            {item.assigned &&
              item.assigned.map((name) => (
                <Persona
                  key={name}
                  size={PersonaSize.size24}
                  hidePersonaDetails
                  text={name}
                  styles={{ root: { marginLeft: "3px" } }}
                />
              ))}
          </div>
        </div>,
      )
    )
  }
}
