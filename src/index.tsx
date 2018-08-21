import * as React from "react"
import * as ReactDOM from "react-dom"
import Board from "./Board"
import "./index.css"
import registerServiceWorker from "./registerServiceWorker"
import Header from "./Header"
import { IconContext } from "react-icons"

ReactDOM.render(
  <IconContext.Provider value={{ style: { verticalAlign: "middle" } }}>
    <Header />
    <Board />
  </IconContext.Provider>,
  document.getElementById("root") as HTMLElement,
)
registerServiceWorker()
