import * as React from "react"
import * as ReactDOM from "react-dom"
import Board from "./Board"
import "./index.css"
import registerServiceWorker from "./registerServiceWorker"
import Header from "./Header"

ReactDOM.render(
  <>
    <Header />
    <Board />
  </>,
  document.getElementById("root") as HTMLElement,
)
registerServiceWorker()
