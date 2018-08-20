import * as React from "react"
import { DragSource, ConnectDragSource, DragSourceSpec, DragSourceCollector } from "react-dnd"
import classnames from "classnames"
import "./SwimlaneItem.css"

type Props = {
  text: string
  connectDragSource?: ConnectDragSource
  isDragging?: boolean
}

const itemSource: DragSourceSpec<Props, { text: string }> = {
  beginDrag(props) {
    return { text: props.text }
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
    const { isDragging, connectDragSource, text } = this.props
    return (
      connectDragSource &&
      connectDragSource(
        <div className={classnames("SwimlaneItem", { SwimlaneItem__isDragging: isDragging })}>{text}</div>,
      )
    )
  }
}
